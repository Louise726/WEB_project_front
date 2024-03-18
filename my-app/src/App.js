import React from 'react';
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

export default App;
