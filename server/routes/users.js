module.exports = (app) => {
    const users = require('../repositories/users');

    var router = require('express').Router();
    // middleware
    const auth = require('../middleware/auth');
    const multerImages = require('../middleware/multer.images');
    // POST
    router.post('/signup', users.signup);
    router.post('/login', users.login);
    //PUT
    router.put('/profile', auth, multerImages, users.update);
    // GET
    router.get('/me', auth, users.findMe);
    //DELETE
    router.delete('/me', auth, users.delete)

    app.use('/api/users', router);
};
