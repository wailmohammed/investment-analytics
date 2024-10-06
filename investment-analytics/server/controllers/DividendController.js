const Dividend = require('../models/Dividend');

exports.getDividends = async (req, res) => {
  try {
    const dividends = await Dividend.find({ user: req.user.id }).sort({ paymentDate: -1 });
    res.json(dividends);
  } catch (error) {
    console.error('Error in getDividends:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addDividend = async (req, res) => {
  try {
    const { symbol, amount, exDate, paymentDate } = req.body;

    const newDividend = new Dividend({
      user: req.user.id,
      symbol,
      amount,
      exDate,
      paymentDate
    });

    const dividend = await newDividend.save();
    res.json(dividend);
  } catch (error) {
    console.error('Error in addDividend:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateDividend = async (req, res) => {
  try {
    const { symbol, amount, exDate, paymentDate } = req.body;

    let dividend = await Dividend.findById(req.params.id);

    if (!dividend) {
      return res.status(404).json({ message: 'Dividend not found' });
    }

    if (dividend.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    dividend = await Dividend.findByIdAndUpdate(
      req.params.id,
      { symbol, amount, exDate, paymentDate },
      { new: true }
    );

    res.json(dividend);
  } catch (error) {
    console.error('Error in updateDividend:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteDividend = async (req, res) => {
  try {
    let dividend = await Dividend.findById(req.params.id);

    if (!dividend) {
      return res.status(404).json({ message: 'Dividend not found' });
    }

    if (dividend.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Dividend.findByIdAndRemove(req.params.id);

    res.json({ message: 'Dividend removed' });
  } catch (error) {
    console.error('Error in deleteDividend:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = exports;