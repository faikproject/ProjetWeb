module.exports = (app) => {
    const articles = require('../repositories/articles');

    var router = require('express').Router();
    // middleware
    const auth = require('../middleware/auth');
    const multerImages = require('../middleware/multer.images');

    //POST
    router.post('/create', auth, multerImages, articles.create);
    //PUT
    //router.put('/:id', auth, multerImages, articles.update);
    router.put('/togglePublish/:id', auth, articles.togglePublish);
    //GET
    router.get('/', articles.findAll);
    //DELETE
    router.delete('/:id', auth, articles.delete);
   

    app.use('/api/articles', router);
};