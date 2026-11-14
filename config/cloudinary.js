const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const getCloudinaryStatus = () => {
    if (
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
    ) {
        return '🟢 CONFIGURED';
    }

    return '🔴 NOT CONFIGURED';
};

module.exports = { cloudinary, getCloudinaryStatus };