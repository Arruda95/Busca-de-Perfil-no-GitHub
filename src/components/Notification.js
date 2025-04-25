import React, { useState, useEffect } from 'react';
import '../styles/notification.css';

const Notification = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, 300); // Tempo da animação de saída
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`notification ${type} ${isVisible ? 'show' : 'hide'}`}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;