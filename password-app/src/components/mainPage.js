import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [websiteName, setWebsiteName] = useState('');
  const [password, setPassword] = useState('');
  const [passwords, setPasswords] = useState([]); 
  const [clickedWebsite, setClickedWebsite] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    // Fetch passwords when the component mounts
    fetchPasswords();
  }, []); // Empty dependency array to fetch passwords only once on mount

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

  return (
    <div>
      <h1>Main Page</h1>

      <label htmlFor="websiteName">Website Name:</label>
      <input
        type="text"
        id="websiteName"
        placeholder="Enter website name"
        value={websiteName}
        onChange={(e) => setWebsiteName(e.target.value)}
      />

      <br />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={handleAddPassword}>Add Password</button>
      <button onClick={handleLogout}>Log Out</button>

      <div>
        <h2>Passwords:</h2>
        {passwords.map((password) => (
          <div key={password.id} onClick={() => setClickedWebsite(password.id)}>
            {password.id === clickedWebsite ? password.decrypted_password : password.website_name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;