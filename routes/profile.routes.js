const express = require('express');
const router = express.Router();

const {
  getProfile,
  saveProfile,
  updateProfile
} = require('../controllers/profile.controller');

const authMiddleware = require('../middleware/auth.middleware');

router.get('/profile', authMiddleware, getProfile);

router.post('/profile', authMiddleware, saveProfile);

router.put('/profile', authMiddleware, updateProfile);

module.exports = router;