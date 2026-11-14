require('dotenv').config();

const express = require('express');
const cors = require('cors');
const packageJson = require('./package.json');

const { connectDB, getDatabaseStatus } = require('./config/db');
const { getCloudinaryStatus } = require('./config/cloudinary');

/* -------------------------------------------------------------------------- */
/*                           Load Routes                              */
/* -------------------------------------------------------------------------- */

const profileRoutes = require('./routes/profile.routes');
const testRoutes = require('./routes/test.routes');
const uploadPropertiesImagesRoutes = require('./routes/upload-properties-images.routes');

const app = express();
const PORT = process.env.PORT || 3000;

/* -------------------------------------------------------------------------- */
/*                           Database Connection                              */
/* -------------------------------------------------------------------------- */

connectDB();

/* -------------------------------------------------------------------------- */
/*                               Middlewares                                  */
/* -------------------------------------------------------------------------- */

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------------------------------------------------------------- */
/*                              Health Routes                                 */
/* -------------------------------------------------------------------------- */

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            application: '🚀 GrabMyFlat API',
            tagline: 'Find Flats • Find Flatmates • Find Home',
            environment: process.env.API_ENV || 'development',
            port: PORT,
            version: packageJson.version,
            website: 'https://www.grabmyflat.com',
            status: {
                api: getStatus(),
                database: getDatabaseStatus(),
                cloudinary: getCloudinaryStatus()
            },
            startedAt: new Date().toLocaleString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            })
        }
    });
});


app.get('/health', async (req, res) => {
    res.json({
        success: true,
        database: getDatabaseStatus(),
        cloudinary: await getCloudinaryStatus(),
        timestamp: new Date().toISOString()
    });
});

/* -------------------------------------------------------------------------- */
/*                                 API Routes                                 */
/* -------------------------------------------------------------------------- */

app.use('/api/users', profileRoutes);

app.use('/api/upload-properties-images', uploadPropertiesImagesRoutes);

app.use('/api/test-cloudinary', testRoutes);

/* -------------------------------------------------------------------------- */
/*                                404 Handler                                 */
/* -------------------------------------------------------------------------- */

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

/* -------------------------------------------------------------------------- */
/*                               Error Handler                                */
/* -------------------------------------------------------------------------- */

app.use((err, req, res, next) => {
    console.error('Server Error:', err);

    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

/* -------------------------------------------------------------------------- */
/*                               Start Server                                 */
/* -------------------------------------------------------------------------- */

const getStatus = () => {
    switch (process.env.API_ENV) {
        case 'prod':
            return '🟢 LIVE';
        case 'stg':
            return '🟠 STAGING';
        case 'qa':
            return '🟡 QA';
        default:
            return '🔵 DEVELOPMENT';
    }
};

app.listen(PORT, () => {
    console.log(`
==================================================
🚀 GrabMyFlat API Started Successfully
==================================================
🌍 Environment : ${process.env.API_ENV || 'development'}
🔗 Port        : ${PORT}
🚧 Version     : ${packageJson.version}
🏠 Website     : https://www.grabmyflat.com
📡 API Status  : ${getStatus()}
🗄️ Database    : ${getDatabaseStatus()}
☁️ Cloudinary  : ${getCloudinaryStatus()}
⏰ Started At  : ${new Date().toLocaleString('en-IN')}
==================================================
    `);
});