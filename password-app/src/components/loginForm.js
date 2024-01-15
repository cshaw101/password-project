import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Sending login request...');
      const response = await axios.post('http://localhost:9000/api/users/login', {
        username,
        password,
      });
  
      if (response.data) {
        console.log('Login successful:', response.data);
  
        // Save token and userId in local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
  
        // Handle successful login, 
      } else {
        console.error('Login failed:', response.data.message);
        // Handle failed login
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


 const handleRegister = async () => {
  try {
    console.log('Sending register request...');
    const response = await axios.post('http://localhost:9000/api/users/register', {
      username,
      password,
    });

    if (response.data) {
      console.log('Registration successful:', response.data);
      // Handle successful registration, 
    } else {
      console.error('Registration failed:', response.data.message);
      // Handle failed registration,
    }
  } catch (error) {
    console.error('Error during registration:', error);
    // Handle network or other errors
  }
};

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
