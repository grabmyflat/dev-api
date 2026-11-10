const express = require('express');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await cloudinary.api.ping();

        res.json({
            success: true,
            result
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;