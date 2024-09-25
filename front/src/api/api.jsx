import axios from 'axios';

// Função que busca o token (assumindo que está armazenado no localStorage)
const getToken = () => {
  return localStorage.getItem('token');  // ou sessionStorage, dependendo de onde você guarda o token
};

export const get_contas = async () => {
  try {
    const token = getToken();  // Recupera o token armazenado

    // Faz a requisição com o token no cabeçalho Authorization
    const response = await axios.get('https://localhost:8080/conta/todasContas', {
      headers: {
        Authorization: `Bearer ${token}`,  // Adiciona o token no cabeçalho
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar contas:', error);
    throw error; 
  }
};
