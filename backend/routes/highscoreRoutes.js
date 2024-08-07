const express = require('express');
const { getHighscores } = require('../controllers/highscoreController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getHighscores);

module.exports = router;
