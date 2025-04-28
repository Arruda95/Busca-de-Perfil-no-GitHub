import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaLink, FaTwitter, FaBuilding, FaUserFriends } from 'react-icons/fa';
import '../styles/profile.css';
// No need to import mario-theme.css as it's already imported in App.js

const Profile = ({ user, useMarioTheme = false }) => {
  const [isVisible, setIsVisible] = useState(false);

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
    </div>
  );
};

export default Profile;