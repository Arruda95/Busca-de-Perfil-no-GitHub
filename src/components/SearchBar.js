import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { searchUsers } from '../services/api';
import UserSuggestions from './UserSuggestions';
import '../styles/search-bar.css';

const SearchBar = ({ onSearch, isLoading }) => {
  const [username, setUsername] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchContainerRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Detecta clique fora do componente para fechar as sugestões
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Busca sugestões quando o usuário digita
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (username.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Adiciona um debounce para evitar excesso de requisições
    debounceTimerRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchUsers(username);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } catch (error) {
        console.error('Erro ao buscar sugestões:', error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      clearTimeout(debounceTimerRef.current);
    };
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username);
      setShowSuggestions(false);
    }
  };

  const handleSelectUser = (selectedUsername) => {
    setUsername(selectedUsername);
    onSearch(selectedUsername);
    setShowSuggestions(false);
  };

  const clearInput = () => {
    setUsername('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchContainerRef} className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className={`search-input-wrapper ${hasFocus ? 'focused' : ''} ${isSearching ? 'searching' : ''}`}>
          <FaSearch className="search-icon" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => {
              setHasFocus(true);
              if (suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            onBlur={() => setHasFocus(false)}
            placeholder="Digite o nome do usuário GitHub"
            className="search-input"
            aria-label="Nome de usuário GitHub"
            autoComplete="off"
          />
          {isSearching && (
            <div className="mini-loader" />
          )}
          {username && !isSearching && (
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
          disabled={!username.trim() || isLoading}
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
      
      <UserSuggestions 
        suggestions={suggestions} 
        onSelectUser={handleSelectUser} 
        visible={showSuggestions}
      />
    </div>
  );
};

export default SearchBar;