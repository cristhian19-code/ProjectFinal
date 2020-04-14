const { Router } = require('express');
const router = Router();
const path = require('path');
const uuid = require('uuid/v4');
const multer = require('multer');
const fs = require('fs');
fs.readFileSync(path.join(__dirname, '../public/db/user.json'), 'utf-8');
const { getConnection } = require('../databases');
let url;
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        const URL = uuid() + path.extname(file.originalname);
        url = URL;
        cb(null, URL)
    }
});

const upload = multer({
    dest: path.join(__dirname, '../public/uploads'),
    storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: (res, file, cb) => {
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
}).single('avatar');

//rutas login
router.get('/', async(req, res) => {
    const user = await getConnection().get('user').value();
    await fs.writeFileSync(path.join(__dirname, '../public/db/user.json'), JSON.stringify({ user }), 'utf-8');
    var datos = getConnection().get('chat').value();
    res.render('index', { datos });
});

router.post('/upload', upload, async(req, res) => {
    const { name, email, password } = req.body;

    if (url != undefined) {
        const newData = {
            name,
            email,
            password,
            avatar: url,
            images: []
        }
        await getConnection().get('user').push(newData).write();
        const user = await getConnection().get('user').value();
        await fs.writeFileSync(path.join(__dirname, '../public/db/user.json'), JSON.stringify({ user }), 'utf-8');
    }

    res.redirect('/');
});

//rutas almacenamiento
router.get('/save', (req, res) => {
    res.render('save');
})

router.post('/saveImg', upload, async(req, res) => {
    const { email, title, description } = req.body;
    if (url != undefined) {
        const datos = {
            title,
            description,
            url
        }
        getConnection().get('user').find({ email: email }).get('images').push(datos).write();
        const user = await getConnection().get('user').value();
        await fs.writeFileSync(path.join(__dirname, '../public/db/user.json'), JSON.stringify({ user }), 'utf-8');
        const images = getConnection().get('user').find({ email: email }).get('images').value();
    }
    res.redirect('/save');
});

//mostrar datos 

router.get('/list', (req, res) => {
    res.render('listImg');
});

module.exports = router;