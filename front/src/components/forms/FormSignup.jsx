import React, { useState } from 'react';
import axios from 'axios';

const FormSignup = () => {
  // Estados para armazenar os valores do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do form (recarregar a página)

    try {
      // Faz o POST para a API
      const response = await axios.post('http://localhost:8080/user/signup', {
        nome: nome,      // Os dados são enviados como um objeto
        email: email,
        senha: senha
      });

      console.log('Cadastro realizado com sucesso:', response.data);
      // Você pode adicionar lógica para redirecionar ou exibir uma mensagem de sucesso aqui

    } catch (error) {
      console.error('Erro ao realizar o cadastro:', error);
      // Você pode adicionar lógica para exibir uma mensagem de erro aqui
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)} // Atualiza o estado nome
      />
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Atualiza o estado email
      />
      <input
        type="password"
        placeholder="senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)} // Atualiza o estado senha
      />
      <input type="submit" value="Cadastrar" />
    </form>
  );
};

export default FormSignup;
