const multer = require('multer');
const path = require('path');
const fs = require('fs');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'video/mp4': 'mp4',
    'video/webm': 'webm',
    'video/ogg': 'ogg',
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const type = file.mimetype?.includes('video') ? 'videos' : 'images';
        const myPath = path.resolve('downloads/' + type + '/' + req.auth.userId);

        fs.mkdirSync(myPath, { recursive: true });
        callback(null, myPath);
    },
    filename: (req, file, callback) => {
        //const name = file.originalname.split(' ').join('_');
        /*  console.log(name); */
        const extension = MIME_TYPES[file.mimetype];
        callback(null, Date.now() + '.' + extension);
    },
});

module.exports = multer({ storage: storage }).fields([{ name: 'avatar' }, { name: 'cover' }, { name: 'medias' }]);