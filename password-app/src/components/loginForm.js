import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './loginForm.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
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
      };
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
  <div className="card-container">
    <div className="card">
      <h2>Login</h2>
      <Form>
        <FloatingLabel
          controlId="formUsername"
          label={isUsernameFocused || username ? '' : 'Username'}
        >
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setIsUsernameFocused(true)}
            onBlur={() => setIsUsernameFocused(false)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="formPassword"
          label={isPasswordFocused || password ? '' : 'Password'}
        >
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
        </FloatingLabel>
        <div className="button-container">
          <Button variant="primary" size="lg" onClick={handleLogin}>
            Login
          </Button>
          <Button variant="secondary" size="lg" onClick={handleRegister}>
            Register
          </Button>
        </div>
      </Form>
    </div>
  </div>
);
};

export default Login;