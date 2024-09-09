import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  './Login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    //https://assortica-inventory.onrender.com
    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    console.log(response)
    if (response.ok) {
      navigate('/Home');
    } else {
      alert('Login failed. Please try again.');
      setPassword("")
      setUsername("")
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="form">
        <h2 className="title">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
};

export default Login;
