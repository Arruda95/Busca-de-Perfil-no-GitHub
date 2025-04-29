// Base URL da API do GitHub
const BASE_URL = 'https://api.github.com';

/**
 * Busca perfil do usuário no GitHub
 * 
 * @param {string} username - Nome de usuário do GitHub
 * @returns {Promise<Object>} - Dados do perfil do usuário
 * @throws {Error} - Erro se o usuário não for encontrado ou ocorrer um problema na requisição
 */
export const fetchUserProfile = async (username) => {
  try {
    // Fetch para a API do GitHub com o username fornecido
    const response = await fetch(`${BASE_URL}/users/${username}`);
    
    // Se a resposta não for bem-sucedida (status diferente de 200-299)
    if (!response.ok) {
      // Se o status for 404, usuário não encontrado
      if (response.status === 404) {
        throw new Error('Usuário não encontrado');
      }
      // Para outros erros, lança uma mensagem mais genérica
      throw new Error('Erro ao buscar dados do usuário');
    }
    
    // Converte a resposta para JSON e retorna
    return await response.json();
  } catch (error) {
    // Captura erros da requisição (ex: sem conexão, problemas no servidor, etc.)
    console.error('Erro ao buscar perfil:', error);
    throw error; // Re-lança o erro para ser tratado pelo componente
  }
};

/**
 * Busca repositórios do usuário no GitHub
 * 
 * @param {string} username - Nome de usuário do GitHub
 * @param {number} perPage - Quantidade de repositórios por página (padrão: 100)
 * @param {number} page - Número da página a ser buscada (padrão: 1)
 * @returns {Promise<Array>} - Lista de repositórios do usuário
 * @throws {Error} - Erro se ocorrer um problema na requisição
 */
export const fetchUserRepositories = async (username, perPage = 100, page = 1) => {
  try {
    // Constroe a URL com os parâmetros de paginação
    const url = `${BASE_URL}/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated`;
    
    // Fetch para a API do GitHub com o username e parâmetros de paginação
    const response = await fetch(url);
    
    // Se a resposta não for bem-sucedida (status diferente de 200-299)
    if (!response.ok) {
      // Se o status for 404, repositórios não encontrados
      if (response.status === 404) {
        throw new Error('Repositórios não encontrados');
      }
      // Para outros erros, lança uma mensagem mais genérica
      throw new Error('Erro ao buscar repositórios do usuário');
    }
    
    // Converte a resposta para JSON e retorna
    return await response.json();
  } catch (error) {
    // Captura erros da requisição
    console.error('Erro ao buscar repositórios:', error);
    throw error; // Re-lança o erro para ser tratado pelo componente
  }
};

/**
 * Busca usuários que correspondem ao termo de pesquisa
 * 
 * @param {string} query - Termo de pesquisa
 * @param {number} perPage - Quantidade de resultados por página (padrão: 10)
 * @returns {Promise<Array>} - Lista de usuários encontrados
 */
export const searchUsers = async (query, perPage = 10) => {
  try {
    // Evita realizar pesquisas com consultas vazias
    if (!query.trim()) return [];
    
    // Constroe a URL com os parâmetros de pesquisa
    const url = `${BASE_URL}/search/users?q=${encodeURIComponent(query)}&per_page=${perPage}`;
    
    // Fetch para a API de pesquisa do GitHub
    const response = await fetch(url);
    
    // Se a resposta não for bem-sucedida
    if (!response.ok) {
      console.error('Erro na pesquisa de usuários:', response.statusText);
      return []; // Retorna um array vazio em caso de erro
    }
    
    // Converte a resposta para JSON
    const data = await response.json();
    
    // Retorna os itens da pesquisa (lista de usuários)
    return data.items || [];
  } catch (error) {
    // Captura erros da requisição
    console.error('Erro ao pesquisar usuários:', error);
    return []; // Retorna um array vazio em caso de erro
  }
}