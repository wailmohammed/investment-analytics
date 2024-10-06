// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import axios from 'axios';

function Dashboard() {
  const [portfolioSummary, setPortfolioSummary] = useState({});
  const [allocationData, setAllocationData] = useState({});
  const [performanceData, setPerformanceData] = useState({});
  const [recentDividends, setRecentDividends] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [portfolioResponse, dividendsResponse] = await Promise.all([
        axios.get('/api/portfolio', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/dividends', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      updatePortfolioSummary(portfolioResponse.data);
      updateAllocationChart(portfolioResponse.data);
      updatePerformanceChart(portfolioResponse.data);
      updateRecentDividends(dividendsResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      alert('Failed to fetch dashboard data. Please try again later.');
    }
  };

  const updatePortfolioSummary = (data) => {
    const totalValue = data.reduce((sum, stock) => sum + stock.currentValue, 0);
    const totalCost = data.reduce((sum, stock) => sum + stock.totalCost, 0);
    const totalGain = totalValue - totalCost;
    const totalGainPercentage = ((totalValue / totalCost) - 1) * 100;

    setPortfolioSummary({
      totalValue,
      totalCost,
      totalGain,
      totalGainPercentage
    });
  };

  const updateAllocationChart = (data) => {
    const labels = data.map(stock => stock.symbol);
    const values = data.map(stock => stock.currentValue);

    setAllocationData({
      labels,
      datasets: [{
        data: values,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#FF6384', '#C9CBCF', '#7CFC00', '#DFFF00'
        ]
      }]
    });
  };

  const updatePerformanceChart = (data) => {
    // This is a placeholder. In a real application, you'd need historical data.
    setPerformanceData({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Portfolio Value',
        data: [10000, 10500, 11000, 10800, 11500, 12000],
        borderColor: '#36A2EB',
        fill: false
      }]
    });
  };

  const updateRecentDividends = (data) => {
    setRecentDividends(data.slice(0, 5));
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Portfolio Summary</h2>
          <p>Total Value: ${portfolioSummary.totalValue?.toFixed(2)}</p>
          <p>Total Cost: ${portfolioSummary.totalCost?.toFixed(2)}</p>
          <p>Total Gain/Loss: ${portfolioSummary.totalGain?.toFixed(2)} ({portfolioSummary.totalGainPercentage?.toFixed(2)}%)</p>
        </div>
        <div className="dashboard-card">
          <h2>Portfolio Allocation</h2>
          <Pie data={allocationData} />
        </div>
        <div className="dashboard-card">
          <h2>Performance</h2>
          <Line data={performanceData} />
        </div>
        <div className="dashboard-card">
          <h2>Recent Dividends</h2>
          {recentDividends.map(dividend => (
            <div key={dividend.id} className="dividend-item">
              <p>{dividend.symbol}: ${dividend.amount} ({new Date(dividend.paymentDate).toLocaleDateString()})</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;