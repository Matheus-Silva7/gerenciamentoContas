import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const FormSingin = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");  // Estado para armazenar erros
  
  const navigate = useNavigate(); 

  const handleCadastro = async (e) => {
    e.preventDefault();
    console.log(email, senha);

    try {
      const response = await axios.post(
        "http://192.168.100.126:3000/user/signin", // URL com ip
        { email, senha }, // Dados
        { headers: { 'Content-Type': 'application/json' } },
      );

      console.log("Resposta do servidor:", response.data); // Para depuração

      // Verifica se o login foi bem-sucedido (status 200)
      if (response.status === 200) {
        
        localStorage.setItem("token", response.data.token); 

        navigate("/contas"); 
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Email ou senha inválidos");  // Exibe mensagem de erro
    }
  };

  return (
    <form onSubmit={handleCadastro}> 
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
      <button type="submit">login</button> 
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Exibe mensagem de erro, se houver */}
    </form>
  );
}

export default FormSingin;
