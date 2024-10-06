// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { getPortfolio, getDividends } from '../services/api';
import { Line, Pie } from 'react-chartjs-2';

const Dashboard = () => {
  // ... state declarations remain the same

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [portfolioResponse, dividendsResponse] = await Promise.all([
        getPortfolio(),
        getDividends()
      ]);

      updatePortfolioSummary(portfolioResponse.data);
      updateAllocationChart(portfolioResponse.data);
      updatePerformanceChart(portfolioResponse.data);
      updateRecentDividends(dividendsResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to fetch dashboard data. Please try again later.');
      setLoading(false);
    }
  };

  // ... rest of the component remains the same
};

export default Dashboard;