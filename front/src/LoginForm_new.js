import React, { useState, useContext } from 'react';
import { AuthContext } from './App';

function LoginForm({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (response.status === 200) {
        console.log("succeed:", data);
        login(username);
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

  const visiblecode= () => {
    setVisible(!Visible);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </div>
        <div>
          <label>Password:</label>
          <input
            type={Visible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button onClick={visiblecode} type="button">
            {Visible ? "Hide" : "Show"} Password
          </button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default LoginForm;
