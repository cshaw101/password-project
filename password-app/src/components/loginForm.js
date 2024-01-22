import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './loginForm.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userMessage, setUserMessage] = useState('')
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log('Sending login request...');
      const response = await axios.post('http://localhost:9000/api/users/login', {
        username,
        password,
      });
  
      console.log('Response:', response.data);
  
      if (response.data && !response.data.error) {
        console.log('Login successful:', response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('loginMessage', `Login successful! Welcome ${username}`);

        setUserMessage('Login successful!');
        resetMessages();
        navigate('/main');
      } else if (response.data && response.data.error) {
        console.error('Login failed:', response.data.error);

        setErrorMessage(response.data.error);
        resetMessages();
      }
    } catch (error) {
      console.error('Error during login:', error);

      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
        resetMessages();
      } else {
        setErrorMessage('Error during login. Please try again.');
        resetMessages();
      }
    }
  };

  

  const handleRegister = async () => {
    try {
      console.log('Sending register request...');
      const response = await axios.post('http://localhost:9000/api/users/register', {
        username,
        password,
      });
  
      console.log('Response:', response.data);
  
      if (response.data && !response.data.error) {
        console.log('Registration successful:', response.data);
        setUserMessage('Registration successful!');
        resetMessages();
      } else if (response.data && response.data.error) {
        console.error('Registration failed:', response.data.error);

        setErrorMessage(response.data.error);
        resetMessages();
      }
    } catch (error) {
      console.error('Error during registration:', error);

      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
        resetMessages();
      } else {
        setErrorMessage('Error during registration. Please try again.');
        resetMessages();
      }
    }
    setPassword('');
    setUsername('');
  };

  const resetMessages = () => {
    
    setTimeout(() => {
      setUserMessage('');
      setErrorMessage('');
    }, 4000);
  };





  return (
    <div className="body">
      <div className="card-container">
        <div className="card">
          <h2 className="title">LOGIN</h2>
          <div className="message-container">
            <p className={`user-message ${userMessage && 'active'}`}>{userMessage}</p>
            <div>{errorMessage && <p className={`error-message ${errorMessage && 'active'}`}>{errorMessage}</p>}</div>
          </div>
        <div>
        <Form.Label className="username-text" htmlFor="inputUsername">Username:</Form.Label>
          <Form.Control
            type="text"
            id="inputUsername"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Label className="password-text"  htmlFor="inputPassword">Password:</Form.Label>
        </div>
        <div>
          <Form.Control
            type="password"
            id="inputPassword"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
        <Button className="login-button" variant="primary" size="lg" onClick={handleLogin}active>
        Login
      </Button>
          <Button className="register-button" variant="primary" size="lg" onClick={handleRegister}active>
            Register
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
