const cloudinary = require('./cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
        folder: 'grabmyflat/properties',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
    })
});

module.exports = storage;