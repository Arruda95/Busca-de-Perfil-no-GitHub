import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaLink, FaTwitter, FaBuilding,  FaCode, FaStar, FaCodeBranch } from 'react-icons/fa';
import '../styles/profile.css';
// No need to import mario-theme.css as it's already imported in App.js

const Profile = ({ user, repositories, useMarioTheme = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAllRepos, setShowAllRepos] = useState(false);

  useEffect(() => {
    if (user) {
      // Small delay to ensure animation runs after rendering
      setTimeout(() => setIsVisible(true), 100);
    }
  }, [user]);

  if (!user) return null;

  // Apply Mario theme classes if enabled
  const profileCardClasses = `profile-card ${isVisible ? 'visible' : ''} ${useMarioTheme ? 'mario-card' : ''}`;
  const statsClasses = `profile-stats ${useMarioTheme ? 'mario-stats' : ''}`;
  const statItemClasses = useMarioTheme ? 'stat-item mario-stat-item' : 'stat-item';
  const statNumberClasses = useMarioTheme ? 'stat-number mario-stat-number' : 'stat-number';
  const buttonClasses = useMarioTheme ? 'repository-button mario-button' : 'repository-button';

  // Limite de repositórios a serem exibidos inicialmente
  const reposToDisplay = showAllRepos ? repositories : repositories?.slice(0, 5);

  return (
    <div className={profileCardClasses}>
      <div className="profile-header">
        <img 
          src={user.avatar_url} 
          alt={`${user.name || user.login}'s profile`} 
          className="profile-avatar"
        />
        <div className="profile-titles">
          <h2 className="profile-name">{user.name || user.login}</h2>
          <a 
            href={user.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="profile-username"
          >
            @{user.login}
          </a>
        </div>
      </div>
      
      {user.bio && (
        <p className="profile-bio">{user.bio}</p>
      )}
      
      <div className="profile-details">
        {user.location && (
          <div className="profile-detail-item">
            <FaMapMarkerAlt className="detail-icon" />
            <span>{user.location}</span>
          </div>
        )}
        
        {user.blog && (
          <div className="profile-detail-item">
            <FaLink className="detail-icon" />
            <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} 
               target="_blank"
               rel="noopener noreferrer"
               className="detail-link">
              {user.blog}
            </a>
          </div>
        )}
        
        {user.twitter_username && (
          <div className="profile-detail-item">
            <FaTwitter className="detail-icon" />
            <a href={`https://twitter.com/${user.twitter_username}`}
               target="_blank"
               rel="noopener noreferrer"
               className="detail-link">
              @{user.twitter_username}
            </a>
          </div>
        )}
        
        {user.company && (
          <div className="profile-detail-item">
            <FaBuilding className="detail-icon" />
            <span>{user.company}</span>
          </div>
        )}
      </div>
      
      <div className={statsClasses}>
        <div className={statItemClasses}>
          <span className={statNumberClasses}>{user.followers}</span>
          <span className="stat-label">Seguidores</span>
        </div>
        <div className={statItemClasses}>
          <span className={statNumberClasses}>{user.following}</span>
          <span className="stat-label">Seguindo</span>
        </div>
        <div className={statItemClasses}>
          <span className={statNumberClasses}>{user.public_repos}</span>
          <span className="stat-label">Repositórios</span>
        </div>
      </div>

      {/* Seção de Repositórios */}
      {repositories && repositories.length > 0 && (
        <div className="repositories-section">
          <h3 className="repositories-title">Repositórios</h3>
          <ul className="repositories-list">
            {reposToDisplay.map(repo => (
              <li key={repo.id} className="repository-item">
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="repository-name"
                >
                  <FaCode className="repo-icon" />
                  {repo.name}
                </a>
                <p className="repository-description">
                  {repo.description || "Sem descrição disponível"}
                </p>
                <div className="repository-stats">
                  {repo.language && (
                    <span className="repo-stat">
                      <div className="language-dot" style={{ backgroundColor: getLanguageColor(repo.language) }}></div>
                      {repo.language}
                    </span>
                  )}
                  <span className="repo-stat">
                    <FaStar className="repo-stat-icon" />
                    {repo.stargazers_count}
                  </span>
                  <span className="repo-stat">
                    <FaCodeBranch className="repo-stat-icon" />
                    {repo.forks_count}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          
          {repositories.length > 5 && (
            <button 
              className={buttonClasses} 
              onClick={() => setShowAllRepos(!showAllRepos)}
            >
              {showAllRepos ? 'Mostrar menos' : `Ver todos os ${repositories.length} repositórios`}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Função para obter a cor associada a cada linguagem de programação
const getLanguageColor = (language) => {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
    'C#': '#178600',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Rust: '#dea584',
    // Adicione mais linguagens se necessário
  };
  
  return colors[language] || '#8f8f8f'; // Cor padrão para linguagens não listadas
};

export default Profile;