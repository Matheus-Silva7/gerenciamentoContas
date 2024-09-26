
import React, { useState } from 'react';
import { createConta } from '../../services/Api'; 
import ContasCard from './ContasCard';
import "./Contas.css";

const ContasContent = () => {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [status, setStatus] = useState('pendente');
  const [message, setMessage] = useState(null); 

  
  const handleCadastro = async (e) => {
    e.preventDefault();
    
    const conta = {
      nome,
      valor,
      dataVencimento,
      status,
    };

    try {
      await createConta(conta); 
      setMessage('Conta cadastrada com sucesso!'); 
     
      setNome('');
      setValor('');
      setDataVencimento('');
      setStatus('pendente');
    } catch (error) {
      console.error('Erro ao cadastrar conta:', error.response?.data || error);
      setMessage('Erro ao cadastrar conta. Tente novamente.');
    }
  };

  return (
    <div className='content-contas'>
      <h1>Gerenciamento de Contas</h1>

      {/* Formulário para cadastrar nova conta */}
      <form className='form-contas' onSubmit={handleCadastro}>
        <div>
          <label htmlFor="nome">Nome da Conta:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Conta de luz"
            required
          />
        </div>
        <div>
          <label htmlFor="valor">Valor:</label>
          <input
            type="number"
            id="valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Ex: 120.00"
            required
          />
        </div>
        <div>
          <label htmlFor="dataVencimento">Data de Vencimento:</label>
          <input
            type="date"
            id="dataVencimento"
            value={dataVencimento}
            onChange={(e) => setDataVencimento(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="paga">Paga</option> 
            <option value="pendente">Pendente</option>
          </select>
        </div>
        <button type="submit">Cadastrar Conta</button>
      </form>

      {/* Exibe mensagem de sucesso ou erro */}
      {message && <p>{message}</p>}

      {/* Exibe os cartões de contas cadastradas */}
      <ContasCard />
    </div>
  );
};

export default ContasContent;
