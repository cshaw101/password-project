import React, { useState } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [websiteName, setWebsiteName] = useState('');
  const [password, setPassword] = useState('');

  const handleAddPassword = async () => {
    try {
      // Retrieve token and userId from localStorage
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      // Make API request to save password and website
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
    } catch (error) {
      console.error('Error adding password:', error);
    }
  };

  const handleLogout = () => {
    // do logout thing
    console.log('Logged out successfully');
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
    </div>
  );
};

export default MainPage;
