import React from 'react';
import '../styles/mario-elements.css';

const MarioElements = () => {
  return (
    <div className="mario-elements">
      {/* Caixas do Mario */}
      <div className="mario-box question-box"></div>
      <div className="mario-box brick-box"></div>
      <div className="mario-box item-box"></div>
      
      {/* Personagens */}
      <div className="mario character"></div>
      <div className="luigi character"></div>
      <div className="yoshi character"></div>
      <div className="toad character"></div>
      <div className="goomba enemy"></div>
      <div className="koopa enemy"></div>
      
      {/* Moedas */}
      <div className="coin"></div>
      <div className="coin delayed-1"></div>
      <div className="coin delayed-2"></div>
    </div>
  );
};

export default MarioElements;
