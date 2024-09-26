
import React, { useEffect, useState } from 'react';
import { getContas, deleteConta, updateConta } from '../../services/Api'; 
import "./ContasCard.css";
import EditModal from '../modal/EditModal';

const ContasCard = () => {
  const [contas, setContas] = useState([]); 
  const [error, setError] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedConta, setSelectedConta] = useState(null); 

  const fetchContas = async () => {
    try {
      const contasData = await getContas(); 
      setContas(contasData);
    } catch (error) {
      console.error('Erro ao buscar contas:', error);
      setError("Erro ao buscar contas");
    }
  };

  const handleDeleteConta = async (id) => {
    try {
      await deleteConta(id); 
      setContas(prevContas => prevContas.filter(conta => conta.id !== id));
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      setError("Erro ao excluir conta");
    }
  };

  const handleEditClick = (conta) => {
    setSelectedConta(conta);
    setIsModalOpen(true);
  };
  

  const handleSave = async (updatedConta) => {
    try {
      await updateConta(updatedConta); // Chama a função para atualizar
      setContas(prevContas => prevContas.map(conta => 
        conta.id === updatedConta.id ? updatedConta : conta
      ));
    } catch (error) {
      console.error('Erro ao atualizar conta:', error);
      setError("Erro ao atualizar conta");
    }
  };

  useEffect(() => {
    fetchContas();
  }, []);  

  return (
    <div>
      <button onClick={fetchContas}>Recarregar</button> 
      {error && <p>{error}</p>} 
      {contas.length > 0 ? (
        contas.map((conta) => (
          <div className='contas-card' key={conta.id}>
            <p><strong>Nome:</strong> {conta.nome}</p>
            <p><strong>Valor:</strong> {conta.valor}</p>
            <p><strong>Data de Vencimento:</strong> {new Date(conta.dataVencimento).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {conta.status}</p>
            <button onClick={() => handleEditClick(conta)}>Editar</button> {/* Botão de edição */}
            <button onClick={() => handleDeleteConta(conta.id)}>Excluir</button>
          </div>
        ))
      ) : (
        <p>Nenhuma conta encontrada</p>
      )}

      <EditModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        conta={selectedConta} 
        onSave={handleSave} 
      />
    </div>
  );
};

export default ContasCard;
