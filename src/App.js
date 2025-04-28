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
import { fetchUserProfile } from './services/api';

// Define o componente principal da aplicação chamado App
function App() {
  // Declaração dos estados do componente usando o hook useState
  const [user, setUser] = useState(null);           // Armazena os dados do usuário encontrado (inicia como nulo)
  const [error, setError] = useState('');           // Armazena mensagens de erro (inicia como string vazia)
  const [isLoading, setIsLoading] = useState(false); // Indica se uma busca está em andamento (inicia como falso)
  const [notification, setNotification] = useState(null); // Armazena informações de notificação (inicia como nulo)

  // Hook useEffect para lidar com o redimensionamento da janela (detecção de teclado virtual)
  // A array de dependências vazia [] garante que este efeito execute apenas uma vez após a montagem inicial do componente
  useEffect(() => {
    // Função para lidar com o evento de redimensionamento da janela
    const handleResize = () => {
      // Verifica se a altura da janela é significativamente menor que a largura ou menor que um limite (450px)
      // Isso é uma heurística para detectar se um teclado virtual está provavelmente aberto em dispositivos móveis
      const isKeyboardOpen = window.innerHeight < window.innerWidth || window.innerHeight < 450;
      
      // Adiciona ou remove a classe 'keyboard-open' do elemento body com base na detecção
      // A função toggle adiciona a classe se o segundo argumento (isKeyboardOpen) for true, e remove se for false
      document.body.classList.toggle('keyboard-open', isKeyboardOpen);
    };

    // Adiciona um ouvinte de evento para o evento 'resize' na janela, chamando handleResize quando ocorrer
    window.addEventListener('resize', handleResize);

    // Função de limpeza: será executada quando o componente for desmontado
    // Remove o ouvinte de evento para evitar vazamentos de memória e chamadas desnecessárias
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Array de dependências vazia significa que o efeito só roda na montagem e a limpeza na desmontagem

  // Função assíncrona para lidar com a busca de um usuário
  // Recebe o nome de usuário como argumento
  const handleSearch = async (username) => {
    setIsLoading(true);  // Define o estado de carregamento como verdadeiro
    setError('');        // Limpa qualquer mensagem de erro anterior
    setUser(null);       // Limpa os dados do usuário anterior
    setNotification(null); // Limpa qualquer notificação anterior

    // Bloco try...catch para lidar com a chamada da API e possíveis erros
    try {
      // Chama a função fetchUserProfile para buscar os dados do usuário na API do GitHub
      const userData = await fetchUserProfile(username);
      // Se a busca for bem-sucedida, atualiza o estado 'user' com os dados recebidos
      setUser(userData);
      // Define uma notificação de sucesso
      setNotification({
        message: `Perfil de ${userData.name || userData.login} encontrado!`, // Mensagem usa nome real ou login
        type: 'success', // Tipo da notificação
      });
    // Se ocorrer um erro durante a busca (ex: usuário não encontrado, erro de rede)
    } catch (err) {
      // Atualiza o estado 'error' com a mensagem de erro recebida
      setError(err.message);
      // Garante que não haja notificação em caso de erro
      setNotification(null);
    // Bloco finally é executado sempre, independentemente de sucesso ou erro
    } finally {
      // Define o estado de carregamento como falso ao final da operação
      setIsLoading(false);
    }
  };

  // Função para limpar (remover) a notificação visível
  const clearNotification = () => {
    // Define o estado da notificação como nulo, fazendo-a desaparecer da interface
    setNotification(null);
  };

  // Retorna a estrutura JSX (HTML-like) que define a interface do usuário do componente
  return (
    // Container principal da aplicação
    <div className="app-container">
      {/* Renderiza os componentes de fundo e elementos decorativos do tema Mario */}
      <MarioBackground />
      <MarioElements />
      
      {/* Cabeçalho da aplicação */}
      <header className="app-header">
        {/* Título principal com classe de tema Mario */}
        <h1 className="app-title mario-title">Busca de Perfil no GitHub</h1>
        {/* Subtítulo com classe de tema Mario */}
        <p className="app-subtitle mario-subtitle">
          Encontre e visualize informações de usuários do GitHub
        </p>
      </header>

      {/* Conteúdo principal da aplicação */}
      <main className="app-content">
        {/* Renderiza o componente SearchBar, passando a função handleSearch, o estado isLoading e a flag de tema */}
        <SearchBar onSearch={handleSearch} isLoading={isLoading} useMarioTheme={true} />

        {/* Renderização condicional: Exibe o LoadingSpinner SE isLoading for verdadeiro */}
        {isLoading && <LoadingSpinner />}

        {/* Renderiza o componente ErrorMessage, passando a mensagem de erro (só exibe algo se 'error' não for vazio) */}
        <ErrorMessage message={error} />

        {/* Renderização condicional: Exibe o componente Profile SE não estiver carregando, não houver erro E houver dados de usuário */}
        {!isLoading && !error && user && <Profile user={user} useMarioTheme={true} />}

        {/* Renderização condicional: Exibe o componente Notification SE o estado 'notification' não for nulo */}
        {notification && (
          <Notification 
            message={notification.message} // Passa a mensagem da notificação
            type={notification.type}       // Passa o tipo da notificação (ex: 'success')
            onClose={clearNotification}    // Passa a função para fechar a notificação
          />
        )}
      </main>

      {/* Rodapé da aplicação com tema Mario */}
      <footer className="app-footer mario-footer">
        {/* Elemento de chão do tema Mario */}
        <div className="mario-ground"></div>
        {/* Renderiza o componente GitHubFooter, passando um nome de usuário específico */}
        <GitHubFooter username="Arruda95" /> 
      </footer>
    </div>
  );
}

// Exporta o componente App para que possa ser utilizado em outras partes da aplicação (geralmente no index.js)
export default App;