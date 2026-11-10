const express = require('express');
const multer = require('multer');

const storage = require('../config/cloudinaryStorage');

const router = express.Router();

const upload = multer({ storage });

router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Upload Route Working'
    });
});

router.post('/', upload.array('images', 10), (req, res) => {

    const files = req.files.map(file => ({
        publicId: file.filename,
        url: file.path
    }));

    res.status(200).json({
        success: true,
        count: files.length,
        files
    });
});

module.exports = router;