const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getDividends, addDividend, updateDividend, deleteDividend } = require('../controllers/dividendController');

// @route   GET api/dividends
// @desc    Get all dividends
// @access  Private
router.get('/', auth, getDividends);

// @route   POST api/dividends
// @desc    Add new dividend
// @access  Private
router.post('/', auth, addDividend);

// @route   PUT api/dividends/:id
// @desc    Update dividend
// @access  Private
router.put('/:id', auth, updateDividend);

// @route   DELETE api/dividends/:id
// @desc    Delete dividend
// @access  Private
router.delete('/:id', auth, deleteDividend);

module.exports = router;