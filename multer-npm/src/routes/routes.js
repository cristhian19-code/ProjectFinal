const { Router } = require('express');
const router = Router();
const { getConnection } = require('../database');
const path = require('path');
const uuid = require('uuid/v4');
var multer = require('multer');

var respo = false;

const storage = multer.diskStorage({ //como va a almacenar multer
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        const URL = uuid() + path.extname(file.originalname);
        getConnection().get('url').push({ url: URL }).write();
        cb(null, URL);
    },
});

const upload = multer({
    dest: path.join(__dirname, '../public/uploads'),
    storage,
    limits: {
        fileSize: 700000
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|ico/
        const mimetypes = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if (mimetypes && extname) {
            respo = true;
            return cb(null, true);
        }
        respo = false;
        return cb(null, false);
    }
}).single('archivo');

router.get('/', (req, res) => {
    const datos = getConnection().get('url').value();
    res.render('index', { datos });
});

router.post('/upload', upload, (req, res) => {
    console.log(respo);
    res.redirect('/');
});

module.exports = router;