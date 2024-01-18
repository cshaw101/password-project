import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './mainPage.css'

const MainPage = () => {
  const [websiteName, setWebsiteName] = useState('');
  const [password, setPassword] = useState('');
  const [passwords, setPasswords] = useState([]);
  const [clickedWebsite, setClickedWebsite] = useState(null);
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there is a token in local storage
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to the login page if there is no token
      navigate('/');
    } else {
      // Fetch passwords if there is a token
      fetchPasswords();

      // Check if there is a login message in local storage
      const storedLoginMessage = localStorage.getItem('loginMessage');
      if (storedLoginMessage) {
        // Set the login message to state
        setLoginMessage(storedLoginMessage);
        // Clear the login message from local storage
        localStorage.removeItem('loginMessage');
      }
    }
  }, [navigate]);

  // Cleanup effect to remove the message after 3 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoginMessage('');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);
  // Function to fetch passwords and update state
  const fetchPasswords = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:9000/api/passwords/${userId}`);
      setPasswords(response.data);
    } catch (error) {
      console.error('Error getting passwords:', error);
    }
  };

  const handleAddPassword = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      const response = await axios.post(
        'http://localhost:9000/api/passwords',
        {
          user_id: userId,
          website_name: websiteName,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Password added successfully:', response.data);

      // Fetch and update the list of passwords after adding a new one
      fetchPasswords();
      
    } catch (error) {
      console.error('Error adding password:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    const hasToken = localStorage.getItem('token') !== null;

    if (hasToken) {
      console.log('Token found in localStorage:', localStorage.getItem('token'));
    } else {
      console.log('No token found in localStorage. User is Logged out.');
    }

    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setPassword('')
    setWebsiteName('')
  }



  return (
    <div className='body'>
    <div className='card-container'>
      <div className='card'>
      <form onSubmit={handleSubmit}>
      <h1 className='title'>Main Page</h1>
      {loginMessage && <p>{loginMessage}</p>}
      
      <Form.Label className="websiteName-text" htmlFor="websiteName">Website Name:</Form.Label>
      <Form.Control
        type="text"
        id="websiteName"
        placeholder="Enter website name"
        value={websiteName}
        onChange={(e) => setWebsiteName(e.target.value)}
      />

      <br />

      <Form.Label className="password-text" htmlFor="password">Password:</Form.Label>
      <Form.Control
        type="password"
        id="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <div className='button-container'>
      <Button className='password-button' variant="primary" size="lg" onClick={handleAddPassword}>Add Password</Button>
      <Button className='logOut-button' variant="primary" size="lg" onClick={handleLogout}>Log Out</Button>
      </div>
      <div>
  <h2>Passwords:</h2>
  {passwords.map((password) => (
    <div key={password.id} onClick={() => setClickedWebsite(prevClicked => (prevClicked === password.id ? null : password.id))}>
      {password.id === clickedWebsite ? password.decrypted_password : password.website_name}
    </div>
  ))}
</div>
</form>
</div>
</div>
    </div>
  );
};

export default MainPage;
