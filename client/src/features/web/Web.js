import React, { useState } from 'react';
import './web.css';

function Web() {
  const [animateWeb, setAnimateWeb] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showText, setShowText] = useState(false);

  const handleClick = () => {
    setAnimateWeb(true);
    setTimeout(() => {
      setShowLoginButton(true);
    }, 5000); // זמן האנימציה תואם לזמן ההעלמות של הרשת

    setTimeout(() => {
      setShowText(true);
    }, 6000); // הצגת הטקסט לאחר שהרשת נעלמת
  };

  return (
    <div className="App">
      <h1>רוצה לפרוץ את המחסום?</h1>
      {!showLoginButton && <button onClick={handleClick}>היכנס</button>}
      {showLoginButton && (
        <a href="/login" className="login-button">LOGIN</a>
      )}
      <div className="face-container">
        <img src='face.png' alt="Face" className="face-image" />
        <div className={`web-container ${animateWeb ? 'animate' : ''}`}>
          <img src='web.png' alt="Web" className="web-image" />
        </div>
      </div>
      {showText && <p className="fade-in-text">פה באתר נעזור לך לדעת אנגלית בקלות ובצורה שלא תשכח.</p>}
    </div>
  );
}

export default Web;
