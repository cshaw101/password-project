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
        // Login successful
        console.log('Login successful:', response.data);
  
        // Save token, userId, and message in local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('loginMessage', `Login successful! Welcome ${username}`);
  
        // Handle successful login
        navigate('/main');
      } else if (response.data && response.data.error) {
        // Login failed
        console.error('Login failed:', response.data.error);
  
        // Save error message in local storage for displaying on MainPage
        localStorage.setItem('loginError', response.data.error);
  
        // Handle failed login
      }
    } catch (error) {
      console.error('Error during login:', error);
  
      // Check if the error response contains a message
      if (error.response && error.response.data && error.response.data.message) {
        // Set the error message state for displaying on the login page
        setErrorMessage(error.response.data.message);
      } else {
        // Set a generic error message state for other errors
        setErrorMessage('Error during login. Please try again.');
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
        // Registration successful
        console.log('Registration successful:', response.data);
        // Handle successful registration,
      } else if (response.data && response.data.error) {
        // Registration failed
        console.error('Registration failed:', response.data.error);
  
        // Set error message state for displaying on the login page
        setErrorMessage(response.data.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
  
      // Check if the error response contains a message
      if (error.response && error.response.data && error.response.data.message) {
        // Set the error message state for displaying on the login page
        setErrorMessage(error.response.data.message);
      } else {
        // Set a generic error message state for other errors
        setErrorMessage('Error during registration. Please try again.');
      }
    }
    setPassword('')
    setUsername('')
  };





  return (
    <div className="body">
    <div className="card-container">
      <div className="card">
        <h2 className="title">LOGIN</h2>
        <div> {errorMessage && <p className="error-message">{errorMessage}</p>}</div>
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
