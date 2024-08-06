const express = require('express');
const { addResult, getResults } = require('../controllers/resultController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, addResult).get(protect, getResults);

module.exports = router;
