require('dotenv').config();

const express = require('express');
const cors = require('cors');

const uploadRoutes = require('./routes/upload.routes');

const testRoutes = require('./routes/test.routes');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/test-cloudinary', testRoutes);

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'GrabMyFlat API is running'
    });
});

app.get('/health', (req, res) => {
    res.json({
        success: true,
        status: 'UP',
        timestamp: new Date()
    });
});

app.use('/api/upload', uploadRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 GrabMyFlat API running on port ${PORT}`);
});