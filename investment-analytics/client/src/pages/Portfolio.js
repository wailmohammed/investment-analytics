// src/pages/Portfolio.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Portfolio() {
  const [stocks, setStocks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStock, setNewStock] = useState({ symbol: '', shares: '', purchasePrice: '', purchaseDate: '' });

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/portfolio', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStocks(response.data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
      alert('Failed to fetch stocks. Please try again later.');
    }
  };

  const handleAddStock = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/portfolio', newStock, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowAddForm(false);
      setNewStock({ symbol: '', shares: '', purchasePrice: '', purchaseDate: '' });
      fetchStocks();
    } catch (error) {
      console.error('Error adding stock:', error);
      alert('Failed to add stock. Please try again.');
    }
  };

  const handleDeleteStock = async (id) => {
    if (window.confirm('Are you sure you want to delete this stock?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/portfolio/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchStocks();
      } catch (error) {
        console.error('Error deleting stock:', error);
        alert('Failed to delete stock. Please try again.');
      }
    }
  };

  const calculateGainLoss = (stock) => {
    const gainLoss = (stock.currentPrice - stock.purchasePrice) * stock.shares;
    const gainLossPercentage = ((stock.currentPrice / stock.purchasePrice) - 1) * 100;
    return `$${gainLoss.toFixed(2)} (${gainLossPercentage.toFixed(2)}%)`;
  };

  return (
    <div className="container">
      <h1>Your Portfolio</h1>
      <button onClick={() => setShowAddForm(!showAddForm)}>Add New Stock</button>
      {showAddForm && (
        <form onSubmit={handleAddStock}>
          <input
            type="text"
            placeholder="Symbol"
            value={newStock.symbol}
            onChange={(e) => setNewStock({...newStock, symbol: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Shares"
            value={newStock.shares}
            onChange={(e) => setNewStock({...newStock, shares: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Purchase Price"
            value={newStock.purchasePrice}
            onChange={(e) => setNewStock({...newStock, purchasePrice: e.target.value})}
            required
          />
          <input
            type="date"
            placeholder="Purchase Date"
            value={newStock.purchaseDate}
            onChange={(e) => setNewStock({...newStock, purchaseDate: e.target.value})}
            required
          />
          <button type="submit">Add Stock</button>
        </form>
      )}
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Shares</th>
            <th>Purchase Price</th>
            <th>Current Price</th>
            <th>Total Value</th>
            <th>Gain/Loss</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr key={stock.id}>
              <td>{stock.symbol}</td>
              <td>{stock.shares}</td>
              <td>${stock.purchasePrice.toFixed(2)}</td>
              <td>${stock.currentPrice.toFixed(2)}</td>
              <td>${(stock.shares * stock.currentPrice).toFixed(2)}</td>
              <td>{calculateGainLoss(stock)}</td>
              <td>
                <button onClick={() => handleDeleteStock(stock.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Portfolio;