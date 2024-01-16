import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './loginForm.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log('Sending login request...');
      const response = await axios.post('http://localhost:9000/api/users/login', {
        username,
        password,
      });

      if (response.data) {
        console.log('Login successful:', response.data);

        // Save token, userId, and message in local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('loginMessage', 'Login successful! Welcome.');

        // Handle successful login
        navigate('/main');
      } else {
        console.error('Login failed:', response.data.message);
        // Save error message in local storage for displaying on MainPage
        localStorage.setItem('loginError', response.data.message);
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
    <div className="body">
    <div className="card-container">
      <div className="card">
        <h2 className="title">LOGIN</h2>
        <div>
        <Form.Label className="username-text" htmlFor="inputUsername">Username</Form.Label>
          <Form.Control
            type="text"
            id="inputUsername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Label className="password-text"  htmlFor="inputPassword">Password</Form.Label>
        </div>
        <div>
          <Form.Control
            type="password"
            id="inputPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
             <Form.Text id="passwordHelpBlock" muted>
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
        </Form.Text>
        </div>
        <div className="button-container">
        <Button className="login-button" variant="primary" size="lg" onClick={handleLogin}active>
        Login
      </Button>
          <Button className="register-button" variant="secondary" size="lg" onClick={handleRegister}active>
            Register
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
