import React, { useState } from 'react';
import './styles/global.css';
import './styles/animations.css';
import SearchBar from './components/SearchBar';
import Profile from './components/Profile';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import Notification from './components/Notification';
import { fetchUserProfile } from './services/api';

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleSearch = async (username) => {
    setIsLoading(true);
    setError('');
    setUser(null);
    
    try {
      const userData = await fetchUserProfile(username);
      setUser(userData);
      setNotification({
        message: `Perfil de ${userData.name || userData.login} encontrado!`,
        type: 'success'
      });
    } catch (err) {
      setError(err.message);
      setNotification(null);
    } finally {
      setIsLoading(false);
    }
  };

  const clearNotification = () => {
    setNotification(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Busca de Perfil no GitHub</h1>
        <p className="app-subtitle">Encontre e visualize informações de usuários do GitHub</p>
      </header>
      
      <main className="app-content">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        
        {isLoading && <LoadingSpinner />}
        
        <ErrorMessage message={error} />
        
        {!isLoading && !error && user && <Profile user={user} />}
        
        {notification && (
          <Notification 
            message={notification.message}
            type={notification.type}
            onClose={clearNotification}
          />
        )}
      </main>
      
      <footer className="app-footer">
        <p>° 2025</p>
      </footer>
    </div>
  );
}

export default App;