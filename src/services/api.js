import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com'
});

export const fetchUserProfile = async (username) => {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('Usuário não encontrado');
    }
    throw new Error('Erro ao buscar dados do usuário');
  }
};

export const searchUsers = async (query) => {
  try {
    if (!query || query.trim() === '') return [];
    
    const response = await api.get('/search/users', {
      params: {
        q: query,
        per_page: 5  // Limita o número de resultados para 5
      }
    });
    
    return response.data.items.map(user => ({
      id: user.id,
      login: user.login,
      avatar_url: user.avatar_url,
      html_url: user.html_url
    }));
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return [];
  }
};

export default api;