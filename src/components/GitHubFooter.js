import React, { useState, useEffect } from 'react';
import '../styles/github-footer.css'; // We'll update this CSS file

const GitHubFooter = ({ username = 'Arruda95' }) => {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        
        // Fetch repos data
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`);
        if (!reposResponse.ok) throw new Error('Failed to fetch repos data');
        const reposData = await reposResponse.json();
        
        setUserData(userData);
        setRepos(reposData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  // Language color mapper
  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: 'javascript',
      TypeScript: 'typescript',
      HTML: 'html',
      CSS: 'css',
      Python: 'python',
      Java: 'java',
    };
    
    return colors[language] || '';
  };

  if (loading) {
    return (
      <div className="github-footer compact">
        <div className="mario-loading">
          <div className="mario-spinner"></div>
          <p>Loading GitHub data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="github-footer compact">
        <div className="mario-error">
          <img src="https://mario.wiki.gallery/images/thumb/6/62/Goomba_-_MarioPartyStarRush.png/200px-Goomba_-_MarioPartyStarRush.png" alt="Error" />
          <p>Error loading GitHub data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="github-footer compact">
      {/* Mario and Luigi animation */}
      <div className="mario-character running"></div>
      <div className="luigi-character running"></div>
      
      <div className="footer-content">
        <div className="footer-title">Desenvolvedor do projeto</div>
        
        <div className="github-profile">
          <img className="github-avatar" src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
          <div className="profile-info">
            <h3 className="github-username">{userData.name || userData.login}</h3>
            <div className="github-bio">{userData.bio || 'No bio available'}</div>
            
            <div className="github-stats">
              <span><i className="stats-icon">👥</i>{userData.followers} Seguidores</span>
              <span><i className="stats-icon">👤</i>{userData.following} Seguindo</span>
              <span><i className="stats-icon">📚</i>{userData.public_repos} Repositórios</span>
            </div>
          </div>
        </div>
        
        <div className="github-repos">
          <h4>Recent Repositories</h4>
          
          {repos.length > 0 ? (
            <ul className="repo-list">
              {repos.map(repo => (
                <li className="repo-item" key={repo.id}>
                  <div className="repo-icon">📁</div>
                  
                  <div className="repo-content">
                    <a href={repo.html_url} className="repo-name" target="_blank" rel="noopener noreferrer">
                      {repo.name}
                    </a>
                    
                    <div className="repo-description">
                      {repo.description || 'No description available'}
                    </div>
                    
                    <div className="repo-stats">
                      {repo.language && (
                        <span className="language">
                          <span className={`language-dot ${getLanguageColor(repo.language)}`}></span>
                          {repo.language}
                        </span>
                      )}
                      <span><i className="stats-icon">⭐</i>{repo.stargazers_count}</span>
                      <span><i className="stats-icon">🍴</i>{repo.forks_count}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-repos">No public repositories found</div>
          )}
          
          <a href={`https://github.com/${username}`} className="view-all" target="_blank" rel="noopener noreferrer">
            View All
          </a>
        </div>
      </div>
      
      <div className="mario-footer-decorations">
        <div className="pipe left"></div>
        <div className="pipe right"></div>
        <div className="coin coin1"></div>
        <div className="coin coin2"></div>
        <div className="coin coin3"></div>
      </div>
    </div>
  );
};

export default GitHubFooter;