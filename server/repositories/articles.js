const db = require('../models');
const Article = db.articles;

//API
exports.create = (req, res) => {
    const userId = req.auth ? req.auth.userId : null;

    if (!req.body.name && !req.body.description) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }

    let toUpdate = {};

    if (req.files.medias && req.files.medias.length > 0) {
        const urls = [];
        req.files.medias.forEach((file) => {
            const type = file.mimetype?.includes('video') ? 'videos' : 'images';
            urls.push({
                url: `/downloads/${type}/${userId}/${file.filename}`,
                name: file.filename,
                type: file.mimetype,
                weight: file.size,
            });
        });
        toUpdate = { ...toUpdate, medias: urls };
    }

    toUpdate = {
        ...toUpdate,
        name: req.body.name,
        description: req.body.description,
    };

    // console.log(toUpdate, req.body);

    const article = new Article(toUpdate);

    article
    .save(article)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Article.',
            article,
        });
    });   
};

exports.togglePublish = (req, res) => {
    const id = req.params.id;

    Article.findById(id)
        .then((article) => {
            Article.findByIdAndUpdate(id, { publish: !article.publish }, { new: true })
                .then((data) => {
                    res.send({
                        message: 'Article was updated successfully.',
                        publish: data.publish,
                    });
                })
                .catch((err) => {
                    res.status(500).send({
                        message: 'Error updating article with id=' + id,
                    });
                });
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Not found article with id=' + id,
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
  
    if (req.files.medias && req.files.medias.length > 0) {
        const urls = [];
        req.files.medias.forEach((file) => {
            const type = file.mimetype?.includes('video') ? 'videos' : 'images';
            urls.push({
                url: `/downloads/${type}/${id}/${file.filename}`,
                name: file.filename,
                type: file.mimetype,
                weight: file.size,
            });
        });
        toUpdate = { ...toUpdate, $push: { 'profile.medias': urls } };
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

    Article.findByIdAndUpdate(id, toUpdate, {
        new: true,
    })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update article with id=${id}. Maybe article was not found!`,
                });
            } else {
                res.send({ message: 'Article was updated successfully.', data });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: 'Error updating article with id=' + id,
            });
        });
};

exports.findAll = (req, res) => {
    const p = req.query.p ? req.query.p : 0;
    const l = req.query.l ? req.query.l : 12;

    const perPage = l;
    const page = Math.max(0, p);

    var condition = {
        publish: { $ne: false },
    };

    Article.paginate(condition, {
        offset: page * perPage,
        limit: perPage,
        sort: { createdAt: -1 },
    })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving tutorials.',
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Article.findById(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot find Article with id=${id}. Maybe Article was not found!`,
                });
            } else if (data.user._id.toString() !== req.auth.userId) {
                res.status(401).send({
                    message: 'Unauthorized',
                });
            } else {
                Article.findByIdAndRemove(id)
                    .then((data) => {
                        if (!data) {
                            res.status(404).send({
                                message: `Cannot delete Article with id=${id}. Maybe Article was not found!`,
                            });
                        } else {
                            res.send({
                                message: 'Article was deleted successfully!',
                            });
                        }
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message: 'Could not delete Article with id=' + id,
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving Article with id=' + id,
            });
        });
};
