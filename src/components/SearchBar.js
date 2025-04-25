import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import '../styles/search-bar.css';

const SearchBar = ({ onSearch, isLoading }) => {
  const [username, setUsername] = useState('');
  const [hasFocus, setHasFocus] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    setHasContent(username.trim().length > 0);
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username);
    }
  };

  const clearInput = () => {
    setUsername('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className={`search-input-wrapper ${hasFocus ? 'focused' : ''}`}>
        <FaSearch className="search-icon" />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          placeholder="Digite o nome do usuário GitHub"
          className="search-input"
          aria-label="Nome de usuário GitHub"
        />
        {hasContent && (
          <button 
            type="button" 
            className="clear-button"
            onClick={clearInput}
            aria-label="Limpar campo de busca"
          >
            <FaTimes />
          </button>
        )}
      </div>
      <button 
        type="submit" 
        className={`search-submit-button ${isLoading ? 'loading' : ''}`}
        disabled={!hasContent || isLoading}
      >
        {isLoading ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
  );
};

export default SearchBar;