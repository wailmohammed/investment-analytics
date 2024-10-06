const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getPortfolio, addStock, updateStock, deleteStock } = require('../controllers/portfolioController');

// @route   GET api/portfolio
// @desc    Get user's portfolio
// @access  Private
router.get('/', auth, getPortfolio);

// @route   POST api/portfolio
// @desc    Add new stock
// @access  Private
router.post('/', auth, addStock);

// @route   PUT api/portfolio/:id
// @desc    Update stock
// @access  Private
router.put('/:id', auth, updateStock);

// @route   DELETE api/portfolio/:id
// @desc    Delete stock
// @access  Private
router.delete('/:id', auth, deleteStock);

module.exports = router;