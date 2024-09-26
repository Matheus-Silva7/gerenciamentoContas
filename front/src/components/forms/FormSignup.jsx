// src/components/FormSignup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from '../../services/ApiRegister'; 
import "./Form.css";

const FormSignup = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      const response = await signup(nome, email, senha); 


      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
    
      if (error.response) {
        if (error.response.status === 409) {
          setErrorMessage("Usuário já cadastrado"); 
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
    <div className="form-content">
      <form className="form-register" onSubmit={handleCadastro}>
        <h2>Cadastro</h2>
        <div className="input-content">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            onChange={(e) => setNome(e.target.value)}
            placeholder="nome"
            required
          />
        </div>
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
        <p className="text">Já possui conta? <Link to={"/login"}>Entrar</Link></p>
        <button type="submit">Cadastrar</button>

      
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default FormSignup;
