import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/header.css';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="brand-logo">
          <span className="brand-icon">⚡</span> Workout Guru
        </Link>
        <nav className="header-nav">
          <Link to="/history" className="nav-link">History</Link>
          <Link to="/focus-area" className="nav-button">Custom Workout</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
