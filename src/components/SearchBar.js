import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { searchUsers } from '../services/api';
import UserSuggestions from './UserSuggestions';
import '../styles/search-bar.css';
// No need to import mario-theme.css as it's already imported in App.js

const SearchBar = ({ onSearch, isLoading, useMarioTheme = false }) => {
  // Estado para armazenar o valor do input
  const [username, setUsername] = useState('');
  // Estado para armazenar as sugestões
  const [suggestions, setSuggestions] = useState([]);
  // Estado para controlar a exibição das sugestões
  const [showSuggestions, setShowSuggestions] = useState(false);
  // Estado para detectar se o input está focado
  const [hasFocus, setHasFocus] = useState(false);
  // Estado para controlar o carregamento da busca
  const [isSearching, setIsSearching] = useState(false);
  
  // Ref para acessar o container da busca
  const searchContainerRef = useRef(null);
  // Ref para o timer do debounce
  const debounceTimerRef = useRef(null);

  // Detecta cliques fora do componente para fechar as sugestões
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Se o clique for fora do container, fecha as sugestões
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Faz a busca de sugestões quando o usuário digita
  useEffect(() => {
    // Limpa o timer anterior (caso tenha)
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Se o campo estiver vazio, limpa as sugestões
    if (username.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Cria um timer de debounce para evitar requisições excessivas
    debounceTimerRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchUsers(username); // Faz a busca na API
        setSuggestions(results); // Atualiza as sugestões
        setShowSuggestions(results.length > 0); // Só mostra se tiver resultados
      } catch (error) {
        console.error('Erro ao buscar sugestões:', error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    // Limpa o timer no cleanup do useEffect
    return () => {
      clearTimeout(debounceTimerRef.current);
    };
  }, [username]);

  // Ajusta a posição da página quando o teclado móvel é aberto
  useEffect(() => {
    const handleKeyboardOpen = () => {
      const searchContainer = searchContainerRef.current;
      // Só executa em telas pequenas e se as sugestões estiverem visíveis
      if (searchContainer && window.innerWidth <= 768 && showSuggestions) {
        window.scrollTo({
          top: searchContainer.offsetTop - 20, // Ajusta para dar espaço acima
          behavior: 'smooth' // Rola suavemente
        });
      }
    };

    // Adiciona evento de foco no input
    const searchInput = searchContainerRef.current?.querySelector('input');
    if (searchInput) {
      searchInput.addEventListener('focus', handleKeyboardOpen);
      return () => searchInput.removeEventListener('focus', handleKeyboardOpen);
    }
  }, [showSuggestions]);

  // Lida com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username); // Chama a função de busca
      setShowSuggestions(false); // Fecha as sugestões
    }
  };

  // Lida com a seleção de um usuário da lista de sugestões
  const handleSelectUser = (selectedUsername) => {
    setUsername(selectedUsername); // Preenche o input com o nome selecionado
    onSearch(selectedUsername); // Realiza a busca
    setShowSuggestions(false); // Fecha as sugestões
  };

  // Limpa o campo de input
  const clearInput = () => {
    setUsername(''); // Limpa o valor do input
    setSuggestions([]); // Limpa as sugestões
    setShowSuggestions(false); // Esconde as sugestões
  };

  // ADICIONE A FUNÇÃO AQUI, LOGO ABAIXO ⬇️
  // Adiciona um manipulador para a tecla Enter
  const handleKeyDown = (e) => {
    // Se a tecla pressionada for Enter, fecha as sugestões
    if (e.key === 'Enter') {
      setShowSuggestions(false);
    }
  };

  // Define classes dinâmicas para o wrapper do input
  const inputWrapperClasses = `search-input-wrapper ${hasFocus ? 'focused' : ''} ${isSearching ? 'searching' : ''} ${useMarioTheme ? 'mario-input-wrapper' : ''}`;

  // Define classes dinâmicas para o botão de submit
  const buttonClasses = `search-submit-button ${isLoading ? 'loading' : ''} ${useMarioTheme ? 'mario-button' : ''}`;

  return (
    <div ref={searchContainerRef} className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className={inputWrapperClasses}>
          <FaSearch className="search-icon" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Atualiza o valor conforme digita
            onFocus={() => {
              setHasFocus(true); // Indica que o input está focado
              if (suggestions.length > 0) {
                setShowSuggestions(true); // Mostra sugestões se já existirem
              }
            }}
            onBlur={() => setHasFocus(false)} // Remove o foco
            placeholder="Digite o nome do usuário GitHub"
            className={`search-input ${useMarioTheme ? 'mario-input' : ''}`}
            aria-label="Nome de usuário GitHub"
            autoComplete="off"
            onKeyDown={handleKeyDown} // Adiciona o manipulador de tecla
          />
          {isSearching && (
            <div className="mini-loader" /> // Mostra mini loader enquanto busca
          )}
          {username && !isSearching && (
            <button 
              type="button" 
              className="clear-button"
              onClick={clearInput} // Botão para limpar o input
              aria-label="Limpar campo de busca"
            >
              <FaTimes />
            </button>
          )}
        </div>
        <button 
          type="submit" 
          className={buttonClasses}
          disabled={!username.trim() || isLoading} // Desabilita se vazio ou carregando
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
      {/* Renderiza sugestões se existirem */}
      <UserSuggestions 
        suggestions={suggestions} 
        onSelectUser={handleSelectUser} 
        visible={showSuggestions}
        useMarioTheme={useMarioTheme}
      />
    </div>
  );
};

export default SearchBar;