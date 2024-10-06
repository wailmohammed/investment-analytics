// src/pages/Contact.js
import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="container" role="main">
      <h1>Contact Us</h1>
      <section className="contact-content">
        <p>We're here to help! If you have any questions, suggestions, or need assistance, please don't hesitate to reach out to us.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
        <div className="contact-info">
          <h2>Other Ways to Reach Us</h2>
          <p>Email: support@investmentanalytics.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Finance Street, New York, NY 10001</p>
        </div>
      </section>
    </div>
  );
}

export default Contact;

// src/pages/Dividends.js
import React, { useState, useEffect } from 'react';

function Dividends() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [dividends, setDividends] = useState([]);

  useEffect(() => {
    // Fetch dividends data here
  }, []);

  const handleAddDividend = (e) => {
    e.preventDefault();
    // Handle adding new dividend
  };

  return (
    <div className="container" role="main">
      <h1>Dividend Tracker</h1>
      <div className="dividend-actions">
        <button onClick={() => setShowAddForm(!showAddForm)}>Add New Dividend</button>
      </div>
      {showAddForm && (
        <form id="add-dividend-form" onSubmit={handleAddDividend}>
          <h2>Add New Dividend</h2>
          <div className="form-group">
            <label htmlFor="symbol">Symbol</label>
            <input type="text" id="symbol" name="symbol" required />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" name="amount" step="0.01" required />
          </div>
          <div className="form-group">
            <label htmlFor="exDate">Ex-Dividend Date</label>
            <input type="date" id="exDate" name="exDate" required />
          </div>
          <div className="form-group">
            <label htmlFor="paymentDate">Payment Date</label>
            <input type="date" id="paymentDate" name="paymentDate" required />
          </div>
          <button type="submit">Add Dividend</button>
        </form>
      )}
      <div id="dividend-summary">
        {/* Add dividend summary here */}
      </div>
      <div id="dividend-table">
        {/* Add dividend table here */}
      </div>
      <div id="dividend-chart">
        {/* Add dividend chart here */}
      </div>
    </div>
  );
}

export default Dividends;

// src/pages/Dashboard.js
import React from 'react';

function Dashboard() {
  return (
    <div className="container" role="main">
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <div id="portfolio-summary" className="dashboard-card">
          <h2>Portfolio Summary</h2>
          {/* Add portfolio summary content */}
        </div>
        <div id="portfolio-allocation" className="dashboard-card">
          <h2>Portfolio Allocation</h2>
          {/* Add portfolio allocation chart */}
        </div>
        <div id="performance-chart" className="dashboard-card">
          <h2>Performance</h2>
          {/* Add performance chart */}
        </div>
        <div id="recent-dividends" className="dashboard-card">
          <h2>Recent Dividends</h2>
          {/* Add recent dividends list */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// src/pages/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log(formData);
  };

  return (
    <div className="container" role="main">
      <section className="auth-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </section>
    </div>
  );
}

export default Login;

// src/pages/Portfolio.js
import React, { useState, useEffect } from 'react';

function Portfolio() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Fetch portfolio data here
  }, []);

  const handleAddStock = (e) => {
    e.preventDefault();
    // Handle adding new stock
  };

  return (
    <div className="container" role="main">
      <h1>Your Portfolio</h1>
      <div className="portfolio-actions">
        <button onClick={() => setShowAddForm(!showAddForm)}>Add New Stock</button>
      </div>
      {showAddForm && (
        <form id="add-stock-form" onSubmit={handleAddStock}>
          <h2>Add New Stock</h2>
          <div className="form-group">
            <label htmlFor="symbol">Symbol</label>
            <input type="text" id="symbol" name="symbol" required />
          </div>
          <div className="form-group">
            <label htmlFor="shares">Number of Shares</label>
            <input type="number" id="shares" name="shares" required />
          </div>
          <div className="form-group">
            <label htmlFor="purchasePrice">Purchase Price</label>
            <input type="number" id="purchasePrice" name="purchasePrice" step="0.01" required />
          </div>
          <div className="form-group">
            <label htmlFor="purchaseDate">Purchase Date</label>
            <input type="date" id="purchaseDate" name="purchaseDate" required />
          </div>
          <button type="submit">Add Stock</button>
        </form>
      )}
      <div id="portfolio-table">
        {/* Add portfolio table here */}
      </div>
    </div>
  );
}

export default Portfolio;