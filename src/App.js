// Importa o React e o hook useState
import React, { useState, useEffect } from 'react';

// Importa os arquivos de estilo CSS
import './styles/global.css';         // Estilos globais
import './styles/animations.css';    // Animações CSS
import './styles/mario-theme.css';   // Estilos do tema Mario
import './styles/mario-elements.css';// Estilos para elementos específicos do tema Mario
import './styles/github-footer.css'; // Estilos para o rodapé do GitHub

// Importa os componentes React utilizados na aplicação
import SearchBar from './components/SearchBar';           // Componente da barra de busca
import Profile from './components/Profile';               // Componente para exibir o perfil do usuário
import ErrorMessage from './components/ErrorMessage';     // Componente para exibir mensagens de erro
import LoadingSpinner from './components/LoadingSpinner'; // Componente de indicador de carregamento
import Notification from './components/Notification';     // Componente para exibir notificações (sucesso, etc.)
import MarioBackground from './components/MarioBackground'; // Componente para o fundo temático do Mario
import MarioElements from './components/MarioElements';     // Componente para elementos decorativos do Mario
import GitHubFooter from './components/GitHubFooter';     // Componente para o rodapé com informações do GitHub

// Importa a função para buscar dados da API do GitHub
import { fetchUserProfile, fetchUserRepositories } from './services/api';

// Define o componente principal da aplicação chamado App
function App() {
  // Declaração dos estados do componente usando o hook useState
  const [user, setUser] = useState(null);           // Armazena os dados do usuário encontrado (inicia como nulo)
  const [repositories, setRepositories] = useState([]); // Armazena os repositórios do usuário
  const [error, setError] = useState('');           // Armazena mensagens de erro (inicia como string vazia)
  const [isLoading, setIsLoading] = useState(false); // Indica se uma busca está em andamento (inicia como falso)
  const [notification, setNotification] = useState(null); // Armazena informações de notificação (inicia como nulo)

  // Hook useEffect para lidar com o redimensionamento da janela (detecção de teclado virtual)
  useEffect(() => {
    const handleResize = () => {
      const isKeyboardOpen = window.innerHeight < window.innerWidth || window.innerHeight < 450;
      document.body.classList.toggle('keyboard-open', isKeyboardOpen);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Função para buscar repositórios quando um usuário é encontrado
  const fetchRepos = async (username) => {
    try {
      const reposData = await fetchUserRepositories(username);
      setRepositories(reposData);
    } catch (error) {
      console.error('Erro ao buscar repositórios:', error);
      // Não exibimos erro na UI para não atrapalhar a experiência
      setRepositories([]);
    }
  };

  // Função assíncrona para lidar com a busca de um usuário
  const handleSearch = async (username) => {
    setIsLoading(true);
    setError('');
    setUser(null);
    setRepositories([]);
    setNotification(null);

    try {
      // Busca o perfil do usuário
      const userData = await fetchUserProfile(username);
      setUser(userData);
      
      // Após encontrar o usuário, busca os repositórios
      await fetchRepos(username);
      
      // Define uma notificação de sucesso
      setNotification({
        message: `Perfil de ${userData.name || userData.login} encontrado!`,
        type: 'success',
      });
    } catch (err) {
      setError(err.message);
      setNotification(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para limpar a notificação visível
  const clearNotification = () => {
    setNotification(null);
  };

  // Retorna a estrutura JSX que define a interface do usuário do componente
  return (
    <div className="app-container">
      <MarioBackground />
      <MarioElements />
      
      <header className="app-header">
        <h1 className="app-title mario-title">Busca de Perfil no GitHub</h1>
        <p className="app-subtitle mario-subtitle">
          Encontre e visualize informações de usuários do GitHub
        </p>
      </header>

      <main className="app-content">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} useMarioTheme={true} />

        {isLoading && <LoadingSpinner />}
        <ErrorMessage message={error} />

        {!isLoading && !error && user && (
          <Profile 
            user={user} 
            repositories={repositories} 
            useMarioTheme={true} 
          />
        )}

        {notification && (
          <Notification 
            message={notification.message}
            type={notification.type}
            onClose={clearNotification}
          />
        )}
      </main>

      <footer className="app-footer mario-footer">
        <div className="mario-ground"></div>
        <GitHubFooter username="Arruda95" /> 
      </footer>
    </div>
  );
}

export default App;