import React from 'react';
import '../styles/suggestions.css';

const UserSuggestions = ({ suggestions, onSelectUser, visible }) => {
  // Define a altura máxima da lista com base no tamanho da tela
  const maxHeight = window.innerWidth <= 768 ? '150px' : '320px';

  // Se não for para mostrar ou não houver sugestões, não renderiza nada
  if (!visible || suggestions.length === 0) return null;

  return (
    // Container das sugestões, aplicando a altura máxima dinamicamente
    <div className="suggestions-container" style={{ maxHeight }}>
      <ul className="suggestions-list">
        {/* Mapeia cada sugestão recebida e renderiza como item da lista */}
        {suggestions.map(user => (
          <li 
            key={user.id} // Chave única para cada item (necessário para listas no React)
            className="suggestion-item" 
            onClick={() => onSelectUser(user.login)} // Ao clicar, chama a função para selecionar o usuário
          >
            <img 
              src={user.avatar_url} // Imagem do avatar do usuário
              alt={`${user.login}'s avatar`} // Texto alternativo para acessibilidade
              className="suggestion-avatar" 
            />
            <span className="suggestion-username">{user.login}</span> {/* Nome de usuário */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSuggestions;
