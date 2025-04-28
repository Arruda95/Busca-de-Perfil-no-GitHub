import React from 'react';
import '../styles/mario-background.css';

const MarioBackground = () => {
  return (
    <div className="mario-background">
      {/* Nuvens animadas por trás */}
      <div className="cloud cloud-1"></div>
      <div className="cloud cloud-2"></div>
      <div className="cloud cloud-3"></div>
      
      {/* Cenário de fundo */}
      <div className="ground"></div>
      <div className="pipes">
        <div className="pipe pipe-small"></div>
        <div className="pipe pipe-medium"></div>
        <div className="pipe pipe-large"></div>
      </div>
      <div className="hills">
        <div className="hill hill-small"></div>
        <div className="hill hill-large"></div>
      </div>
      <div className="bushes">
        <div className="bush bush-small"></div>
        <div className="bush bush-large"></div>
      </div>
    </div>
  );
};

export default MarioBackground;