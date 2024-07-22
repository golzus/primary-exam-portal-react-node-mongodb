import React, { useState } from 'react';
import './firstPage.css';
import { Link } from 'react-router-dom';

function FirstPage() {
  const [isLightMode, setIsLightMode] = useState(false);

  const handleSwitchClick = () => {
    setIsLightMode(!isLightMode);
  };

  return (
    <div className={isLightMode ? 'light-mode' : 'dark-mode'}>
      <div className="container">
        <div className="switch-container">
         {!isLightMode&& <img
            src= 'light.jpg' 
            alt="Switch"
            className="image-light"
            onClick={handleSwitchClick}
          />}
        </div>
        <p className="message">
          {isLightMode
          && 'ברוכה הבאה! כאן תלמדי ותתרגלי אנגלית בצורה מהנה ויעילה. בעזרת האתר שלנו תזכרי את כל המילים ותיהני מהתהליך!'}
            {!isLightMode &&'מרגישה שהאנגלית לא נספגת בך? לא קולטת? לא זוכרת?הרימי את המתג וגלי את האור'}
        </p>
        {isLightMode && (
          <Link to="/login" className="login-link">
            LOGIN
          </Link>
        )}
      </div>
    </div>
  );
}

export default FirstPage;
