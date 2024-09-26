// src/components/FormSignin.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from '../../services/ApiRegister';
import "./Form.css";

const FormSingin = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await signin(email, senha); 

      console.log("Resposta do servidor:", response.data); 

      
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Email ou senha inválidos"); // Exibe mensagem de erro
    }
  };

  return (
    <div className="form-content">
      <form className="form-register" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="input-content">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            required
          />
        </div>
        <div className="input-content">
          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            onChange={(e) => setSenha(e.target.value)}
            placeholder="senha"
            required
          />
        </div>
        <p className="text">Não possui conta? <Link to={"/cadastro"}>Cadastre-se</Link></p>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>} 
      </form>
    </div>
  );
};

export default FormSingin;
