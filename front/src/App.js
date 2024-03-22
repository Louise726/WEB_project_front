/*import React from 'react';
import './App.css';
import LoginForm from './LoginForm'; 
import Ranking from './rank'; 

function App() {
  const handleLogin = (username, password) => {
    console.log('Logging in with:', username, password);
    
  };

  return (
    <div className="App">
      <div className="loginForm">
        <h2>Welcome to log in, my young fellows</h2>
        <LoginForm onLogin={handleLogin} />
      </div>
      <Ranking/>
    </div>
  );
}

export default App;*/

import React, { createContext,useState } from 'react';
import LoginForm from './LoginForm_new';
import RegisterForm from './RegisterForm';

export const AuthContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  
  const login = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
    setShowLoginForm(false); 
    setShowRegisterForm(false); 
    console.log("Logging in:", user);
  };

  
  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };

  const toggleForm = (form) => {
    if (form === 'login') {
      setShowLoginForm(true);
      setShowRegisterForm(false);
    } else if (form === 'register') {
      setShowLoginForm(false);
      setShowRegisterForm(true);
    }
  };
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, username }}>
      <div>
        <h1>User System</h1>
        {!isLoggedIn ? (
          <div>
            <button onClick={() => toggleForm('register')}>Register</button>
            <button onClick={() => toggleForm('login')}>Login</button>
          </div>
        ) : (
          <div>
            Welcome, {username}!
            <button onClick={logout}>Logout</button>
          </div>
        )}
        {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}
        {showRegisterForm && <RegisterForm onClose={() => setShowRegisterForm(false)} />}
      </div>
    </AuthContext.Provider>
  );
}



export default App;
