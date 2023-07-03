module.exports = (app) => {
    const users = require('../repositories/users');

    var router = require('express').Router();
    // middleware
    const auth = require('../middleware/auth');

    // POST
    router.post('/signup', users.signup);
    router.post('/login', users.login);
    // GET
    router.get('/me', auth, users.findMe);

    app.use('/api/users', router);
};
