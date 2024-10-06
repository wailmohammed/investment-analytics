const Stock = require('../models/Stock');

exports.getPortfolio = async (req, res) => {
  try {
    const stocks = await Stock.find({ user: req.user.id });
    res.json(stocks);
  } catch (error) {
    console.error('Error in getPortfolio:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addStock = async (req, res) => {
  try {
    const { symbol, shares, purchasePrice, purchaseDate } = req.body;

    const newStock = new Stock({
      user: req.user.id,
      symbol,
      shares,
      purchasePrice,
      purchaseDate
    });

    const stock = await newStock.save();
    res.json(stock);
  } catch (error) {
    console.error('Error in addStock:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const { symbol, shares, purchasePrice, purchaseDate } = req.body;

    let stock = await Stock.findById(req.params.id);

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    if (stock.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    stock = await Stock.findByIdAndUpdate(
      req.params.id,
      { symbol, shares, purchasePrice, purchaseDate },
      { new: true }
    );

    res.json(stock);
  } catch (error) {
    console.error('Error in updateStock:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteStock = async (req, res) => {
  try {
    let stock = await Stock.findById(req.params.id);

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    if (stock.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Stock.findByIdAndRemove(req.params.id);

    res.json({ message: 'Stock removed' });
  } catch (error) {
    console.error('Error in deleteStock:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = exports;