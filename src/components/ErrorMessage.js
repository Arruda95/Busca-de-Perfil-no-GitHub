import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import '../styles/error.css';

const ErrorMessage = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (message) {
      // Pequeno atraso para garantir que a animação seja executada após a renderização
      setTimeout(() => setIsVisible(true), 100);
    } else {
      setIsVisible(false);
    }
  }, [message]);
  
  if (!message) return null;
  
  return (
    <div className={`error-message-container ${isVisible ? 'visible' : ''}`}>
      <div className="error-icon">
        <FaExclamationTriangle />
      </div>
      <div className="error-content">
        <h3 className="error-title">Oops! Algo deu errado</h3>
        <p className="error-text">{message}</p>
        <p className="error-help">Verifique o nome de usuário e tente novamente.</p>
      </div>
    </div>
  );
};

export default ErrorMessage;