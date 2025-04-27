import React from 'react';
import '../styles/suggestions.css';

const UserSuggestions = ({ suggestions, onSelectUser, visible }) => {
  if (!visible || suggestions.length === 0) return null;

  return (
    <div className="suggestions-container">
      <ul className="suggestions-list">
        {suggestions.map(user => (
          <li 
            key={user.id} 
            className="suggestion-item" 
            onClick={() => onSelectUser(user.login)}
          >
            <img 
              src={user.avatar_url} 
              alt={`${user.login}'s avatar`} 
              className="suggestion-avatar" 
            />
            <span className="suggestion-username">{user.login}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSuggestions;