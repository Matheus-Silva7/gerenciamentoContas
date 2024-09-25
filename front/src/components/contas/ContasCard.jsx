import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContasCard = () => {
  const [contas, setContas] = useState([]); 
  const [error, setError] = useState(null); 

  const get_contas = async () => {
    try {
      const token = localStorage.getItem('token');  
      if (!token) {
        throw new Error("Token não encontrado no armazenamento local");
      }

      const response = await axios.get('http://192.168.100.126:3000/conta/todasContas', {
        headers: {
          Authorization: `Bearer ${token}`,  // Adiciona o token no cabeçalho
        },
      });

     
      return response.data.contas; 
    } catch (error) {
      console.error('Erro ao buscar contas:', error);
      throw error; 
    }
  };

  useEffect(() => {
    const fetchContas = async () => {
      try { 
        const data = await get_contas();
        setContas(data);  // Define as contas no estado
      } catch (error) {
        setError("Erro ao buscar contas");
      } 
    };

    fetchContas();
  }, []);  



  if (error) {
    return <p>{error}</p>;  
  }

  return (
    <div>
      <h2>Contas Cadastradas</h2>
      {contas.length > 0 ? (
        contas.map((conta) => (
          <div key={conta.id}>
            <p><strong>Nome:</strong> {conta.nome}</p>
            <p><strong>Valor:</strong> {conta.valor}</p>
            <p><strong>Data de Vencimento:</strong> {new Date(conta.dataVencimento).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {conta.status}</p>
          </div>
        ))
      ) : (
        <p>Nenhuma conta encontrada</p>
      )}
    </div>
  );
};

export default ContasCard;
