import axios from 'axios';

const API_URL = 'http://192.168.100.126:3000/user';//http://ip:port/

const signup = async (nome, email, senha) => {
  const response = await axios.post(
    `${API_URL}/signup`,
    { nome, email, senha },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response;
};

const signin = async (email, senha) => {
  const response = await axios.post(
    `${API_URL}/signin`,
    { email, senha },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response;
};

export { signup, signin };
