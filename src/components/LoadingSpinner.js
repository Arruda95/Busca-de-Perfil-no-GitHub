import React from 'react';
import '../styles/spinner.css';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="spinner-text">Buscando perfis...</p>
    </div>
  );
};

export default LoadingSpinner;