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

export default api;