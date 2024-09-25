import React, { useState, useEffect } from 'react';
import { get_contas } from '../../api/api';

const ContasCard = () => {
  const [contas, set_contas] = useState([]);

  useEffect(() => {
    const fetch_contas = async () => {
      try {
        const data = await get_contas();
        set_contas(data);
      } catch (error) {
        console.error('Erro ao carregar contas:', error);
      }
    };

    fetch_contas();
  }, []);

  return (
    <div>
      {contas.length > 0 ? (
        contas.map((conta, index) => (
          <div key={index}>
            <p>{conta.nome}</p>
            <p>{conta.valor}</p>
            {/* Exiba outros detalhes da conta aqui */}
          </div>
        ))
      ) : (
        <p>Nenhuma conta encontrada</p>
      )}
    </div>
  );
};

export default ContasCard;
