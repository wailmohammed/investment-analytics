const Stock = require('../models/Stock');
const Dividend = require('../models/Dividend');

exports.getAnalysisData = async (req, res) => {
  try {
    const userId = req.user.id;
    const stocks = await Stock.find({ user: userId });
    const dividends = await Dividend.find({ user: userId });

    const sectorAllocation = calculateSectorAllocation(stocks);
    const dividendGrowth = calculateDividendGrowth(dividends);
    const portfolioMetrics = calculatePortfolioMetrics(stocks);
    const stockCorrelation = calculateStockCorrelation(stocks);

    res.json({
      sectorAllocation,
      dividendGrowth,
      portfolioMetrics,
      stockCorrelation
    });
  } catch (error) {
    console.error('Error in getAnalysisData:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

function calculateSectorAllocation(stocks) {
  const sectorData = stocks.reduce((acc, stock) => {
    acc[stock.sector] = (acc[stock.sector] || 0) + stock.currentValue;
    return acc;
  }, {});

  return Object.entries(sectorData).map(([sector, value]) => ({ sector, value }));
}

function calculateDividendGrowth(dividends) {
  const annualDividends = dividends.reduce((acc, dividend) => {
    const year = new Date(dividend.paymentDate).getFullYear();
    acc[year] = (acc[year] || 0) + dividend.amount;
    return acc;
  }, {});

  return Object.entries(annualDividends).map(([year, amount]) => ({ year: parseInt(year), amount }));
}

function calculatePortfolioMetrics(stocks) {
  const totalValue = stocks.reduce((sum, stock) => sum + stock.currentValue, 0);
  const totalCost = stocks.reduce((sum, stock) => sum + stock.totalCost, 0);
  const totalGain = totalValue - totalCost;
  const totalGainPercentage = ((totalValue / totalCost) - 1) * 100;

  // Simplified calculations for beta and Sharpe ratio
  const weightedBeta = stocks.reduce((sum, stock) => sum + (stock.beta * (stock.currentValue / totalValue)), 0);
  const portfolioReturn = totalGain / totalCost;
  const riskFreeRate = 0.02; // Assume 2% risk-free rate
  const portfolioStandardDeviation = 0.15; // Simplified; should be calculated based on historical data
  const sharpeRatio = (portfolioReturn - riskFreeRate) / portfolioStandardDeviation;

  return {
    totalValue,
    totalCost,
    totalGain,
    totalGainPercentage,
    beta: weightedBeta,
    sharpeRatio
  };
}

function calculateStockCorrelation(stocks) {
  // This is a placeholder. In a real application, you'd need historical price data to calculate correlations.
  const symbols = stocks.map(stock => stock.symbol);
  const correlationMatrix = symbols.map(() => 
    symbols.map(() => Math.random() * 2 - 1) // Random values between -1 and 1
  );
  return { symbols, correlationMatrix };
}

module.exports = exports;