import React, { useState, useContext } from 'react';
import { AuthContext } from './App';
import './App.css';

function Signup({ onClose }) {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login_signup } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username}),
      });
  
      const data = await response.json();
      if (response.status === 200) {
        console.log("succeed:", data);
        login_signup(username);
        onClose(); 
        
      } else {
        console.error("fail:", data.msg);
        setErrorMessage(data.msg);
      }
    } catch (error) {
      console.error("wrong:", error);
      setErrorMessage("Network error.")
    }
  };

 

  return (
    <div>
      <h2>Bienvenue à l'inscription!</h2>
      <form onSubmit={handleSubmit} className="login-container">
        <div className="login-item">
          <label>Veuillez entrer votre nom d'utilisateur:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="login-buttons-container">
          <button type="submit" className="submit">Valider</button>
          <button type="button" className="cancel" onClick={onClose}>Annuler</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;