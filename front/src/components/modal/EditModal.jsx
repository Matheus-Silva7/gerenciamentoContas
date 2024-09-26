import React, { useState } from 'react';
import './EditModal.css';

const EditModal = ({ isOpen, onClose, conta, onSave }) => {
  if (!isOpen || !conta) return null;

  const [nome, setNome] = useState(conta.nome);
  const [valor, setValor] = useState(conta.valor);
  const [dataVencimento, setDataVencimento] = useState(conta.dataVencimento);
  const [status, setStatus] = useState(conta.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...conta, nome, valor, dataVencimento, status });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Conta</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </label>
          <label>
            Valor:
            <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} required />
          </label>
          <label>
            Data de Vencimento:
            <input type="date" value={dataVencimento} onChange={(e) => setDataVencimento(e.target.value)} required />
          </label>
          <label>
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="paga">Paga</option>
              <option value="pendente">Pendente</option>
            </select>
          </label>
          <button type="submit">Salvar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
