import React from 'react';
import '../styles/github-footer.css';

const GitHubFooter = () => {
  return (
    <div className="github-footer">
      <p>Visite meu GitHub</p>
      <div className="mario-footer-decorations">
        <div className="pipe left"></div>
        <div className="pipe right"></div>
        <div className="coin coin1"></div>
        <div className="coin coin2"></div>
        <div className="coin coin3"></div>
        
        {/* Adicionando a foto do desenvolvedor com link para o GitHub */}
        <a 
          href="https://github.com/Arruda95/Busca-de-Perfil-no-GitHub" 
          target="_blank" 
          rel="noopener noreferrer"
          className="developer-link"
        >
          <div className="developer-photo">
            <img 
              src="https://github.com/Arruda95.png" 
              alt="Foto do desenvolvedor" 
              className="github-avatar" 
            />
          </div>
          <span>@Arruda95</span>
        </a>
      </div>
    </div>
  );
};

export default GitHubFooter;
