import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 

const FormSignup = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const navigate = useNavigate(); 

  const handleCadastro = async (e) => {
    e.preventDefault();
    console.log(nome, email, senha);

    try {
      const response = await axios.post(
        "http://192.168.100.126:3000/user/signup", // URL com ip
        { nome, email, senha }, // Dados
        { headers: { 'Content-Type': 'application/json' } } // Cabeçalhos
      );

      console.log("Resposta do servidor:", response.data); 

      // Verifica se o cadastro foi bem-sucedido (status 201) e passa para a tela de login
      if (response.status === 201) {
        navigate("/login"); 
      }
    } catch (error) {
      // Verifica se o erro tem uma resposta do servidor
      if (error.response) {
        if (error.response.status === 409) {
          setErrorMessage("Usuário já cadastrado"); // Definindo a mensagem de erro
        } else {
          setErrorMessage("Erro ao cadastrar. Tente novamente.");
        }
      } else {
        console.error("Erro desconhecido:", error);
        setErrorMessage("Erro desconhecido. Verifique sua conexão.");
      }
    }
  };

  return (
    <form onSubmit={handleCadastro}> 
      <input
        type="text"
        name="nome"
        onChange={(e) => setNome(e.target.value)}
        placeholder="nome"
        required
      />
      <input
        type="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        required
      />
      <input
        type="password"
        name="senha"
        onChange={(e) => setSenha(e.target.value)}
        placeholder="senha"
        required
      />
      <button type="submit">Cadastrar</button> 
      <p>Já possui login?</p><Link to={"/login"}>Entrar</Link>

      {/* Exibe a mensagem de erro caso haja */}
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default FormSignup;
