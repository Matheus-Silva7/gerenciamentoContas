import React, { useState } from "react";
import axios from "axios";

const FormSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault();
    console.log(name, email, senha);
    
    try {
      const response = await axios.post(
        "http://192.168.0.102:3000/user/signup", // URL
        { name, email, senha }, // Dados
        { headers: { 'Content-Type': 'application/json' } } // Cabeçalhos
      );
      
      console.log("Resposta do servidor:", response.data); // Para depuração
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };

  return (
    <form onSubmit={handleCadastro}> {/* Use onSubmit no form */}
      <input
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
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
      <button type="submit">Cadastrar</button> {/* Mudança de texto */}
    </form>
  );
};

export default FormSignup;
