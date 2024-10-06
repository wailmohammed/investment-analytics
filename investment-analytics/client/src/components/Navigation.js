// src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navigation() {
  const { isAuthenticated, logout } = useAuth();

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">InvestAnalytics</Link>
        <ul className="nav-menu">
          {isAuthenticated && (
            <>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/dividends">Dividends</Link></li>
              <li><Link to="/analysis">Analysis</Link></li>
            </>
          )}
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="auth-buttons">
          <button onClick={toggleDarkMode} className="dark-mode-toggle">
            Toggle Dark Mode
          </button>
          {isAuthenticated ? (
            <button onClick={logout} className="btn btn-login">Logout</button>
          ) : (
            <>
              <Link to="/login" className="btn btn-login">Login</Link>
              <Link to="/signup" className="btn btn-signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;