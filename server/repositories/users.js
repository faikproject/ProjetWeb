const db = require('../models');
const User = db.users;

//LIBS
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//API
exports.signup = (req, res) => {
    if (!req.body.email || !req.body.pseudo || !req.body.password || !req.body.confirm) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }

    if (req.body.password !== req.body.confirm) {
        res.status(400).send({ message: 'Password and confirm password does not match!' });
        return;
    }

    // console.log(req.body.auth);
    bcrypt.hash(req.body.password, 12).then((hash) => {
        const user = new User({
            neverUpdate: true,
            auth: {
                email: req.body.email,
                password: hash,
            },
            profile: {
                pseudo: req.body.pseudo
            },
        });
        user.save()
            .then(() => {
                res.status(201).send({ message: 'Utilisateur créé !' });
            })
            .catch((error) => {
                return res.status(500).send({
                    message: error.message,
                });
            });
    });
};

exports.login = (req, res) => {
    // Validate request
    if (!req.body.email && !req.body.password) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }

    User.findOne({ 'auth.email': req.body.email, 'auth.enabled': { $ne: false } })
        .then((user) => {
            console.log(user)
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt
                .compare(req.body.password, user.auth.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }

                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", { expiresIn: '15d' })
                    });
                })
                .catch((error) => {
                    console.log(error)
                    res.status(500).json({ error })
                });
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error })
        });
};

exports.findMe = (req, res) => {
    const id = req.auth.userId;

    console.log(req.auth.userId)
    User.findById(id)
        .select({ 'auth.password': 0, })
        .then((data) => {
            console.log(data)
            if (!data)
                res.status(404).send({
                    message: 'Not found with id ' + id,
                });
            else res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving with id=' + id,
            });
        });
};

exports.delete = (req, res) => {
    console.log("delete")
    const id = req.auth.userId;
    User.findByIdAndRemove(id, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete user with id=${id}. Maybe user was not found!`,
                });
            } else {
                res.send({ message: 'User was deleted successfully.' });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error deleting user with id=' + id,
            });
        });
};

exports.findOne = (req, res) => {
    const slug = req.params.slug;

    User.findOne({ 'profile.pseudo': slug, 'auth.enabled': { $ne: false } })
        .select({
            'auth.email': 1,
            createdAt: 1,
            profile: 1,
        })
        .then((data) => {
            if (!data)
                res.status(404).send({
                    message: 'Not found User with slug ' + slug,
                });
            else res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving User with slug=' + slug,
            });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!',
        });
    }
    const id = req.auth.userId;
    const body = req.body;
    let toUpdate = {};

    if (req.files.avatar && req.files.avatar.length > 0) {
        const avatarUrl = `/downloads/images/${id}/${req.files.avatar[0].filename}`;

        toUpdate = { ...toUpdate, 'profile.avatar.url': avatarUrl };
    }

    if (body.email) {
        toUpdate = { ...toUpdate, 'auth.email': body.email };
    }
    if (body.pseudo) {
        toUpdate = { ...toUpdate, 'profile.pseudo': body.pseudo };
    }
    if (body.presentation) {
        toUpdate = { ...toUpdate, 'profile.presentation': body.presentation };
    }
    if (body.address) {
        toUpdate = { ...toUpdate, 'profile.address': body.address };
    }
    if (body.phone) {
        toUpdate = { ...toUpdate, 'profile.phone': body.phone };
    }
    if (body.linkFacebook) {
        toUpdate = { ...toUpdate, 'profile.linkFacebook': body.linkFacebook };
    }
    if (body.linkInstagram) {
        toUpdate = { ...toUpdate, 'profile.linkInstagram': body.linkInstagram };
    }
    if (body.linkTwitter) {
        toUpdate = { ...toUpdate, 'profile.linkTwitter': body.linkTwitter };
    }

    toUpdate = {
        ...toUpdate,
    };

    User.findByIdAndUpdate(id, toUpdate, {
        useFindAndModify: false,
        new: true,
    })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update user with id=${id}. Maybe user was not found!`,
                });
            } else {
                res.send({ message: 'User was updated successfully.', data });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: 'Error updating user with id=' + id,
            });
        });
};
