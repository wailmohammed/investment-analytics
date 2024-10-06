const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAnalysisData } = require('../controllers/analysisController');

// @route   GET api/analysis
// @desc    Get analysis data
// @access  Private
router.get('/', auth, getAnalysisData);

module.exports = router;