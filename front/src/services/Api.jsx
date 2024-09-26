import axios from 'axios';

const API_URL = 'http://192.168.100.126:3000/conta'; // http://ip:port/

const getContas = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error("Token não encontrado no armazenamento local");
  }

  const response = await axios.get(`${API_URL}/todasContas`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.contas;
};

const deleteConta = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error("Token não encontrado no armazenamento local");
  }

  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createConta = async (conta) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error("Token não encontrado no armazenamento local");
  }

  await axios.post(`${API_URL}/novaConta`, conta, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

const updateConta = async (conta) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error("Token não encontrado no armazenamento local");
  }

  await axios.put(`${API_URL}/${conta.id}`, conta, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export { createConta, getContas, deleteConta, updateConta };
