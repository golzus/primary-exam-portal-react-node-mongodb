import React from 'react';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo-container">
      <img src="/logo.png" alt="Logo" className="logo-image" />
      <h2 className="logo-text">QuizMaster English</h2>
    </div>
  );
};

export default Logo;
