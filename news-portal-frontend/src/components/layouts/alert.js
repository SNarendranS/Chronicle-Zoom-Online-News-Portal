
import React from 'react';
import './css/alert.css';

const Alert = ({ message, onClose }) => {
  return (
    <div className="overlay">
      <div className="alert-box">
        <p className="alert-text">{message}</p>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Alert;
