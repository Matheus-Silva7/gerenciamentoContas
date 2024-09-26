import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import axios from 'axios';
import "./Nav.css"

const Nav = () => {
  const [profile, setProfile] = useState(null);  
  const navigate = useNavigate();  

  
  const logout = () => {
    localStorage.removeItem('token');  
    navigate("/login");  
  };

  const get_profile = async () => {
    try {
      const token = localStorage.getItem('token');  
      if (!token) {
        return;
      }

      const response = await axios.get('http://192.168.100.126:3000/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(response.data.userData);  
    } catch (error) {
      console.error('Erro ao buscar Profile:', error);
    }
  };

  useEffect(() => {
    get_profile();
  }, []);

  return (
    <nav className='navbar'>
      <div className="logo">
        <h1>Gerenciamento<br />Contas</h1>
      </div>
      <ul>
      <li><Link to={"/"}>Home</Link></li>
        <li>
          {profile?.nome ? (
            <p>Olá, <strong>{profile.nome}</strong></p>
          ) : (
            <p>
              <Link to="/login">Entre</Link> ou <Link to="/cadastro">Cadastre-se</Link>
            </p>
          )}
        </li>
   
        <li>{profile ? <button className='logout' onClick={logout}>Sair</button> : ""}</li>
      </ul>
    </nav>
  );
};

export default Nav;
