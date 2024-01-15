// MainPage.js

import React, { useState } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [websiteName, setWebsiteName] = useState('');
  const [password, setPassword] = useState('');

  const handleAddPassword = async () => {
    try {
      // Make API request to add password
      const response = await axios.post('http://localhost:9000/api/passwords', {
        user_id: 1, // Assuming you have a user ID; replace with the actual user ID
        website_name: websiteName,
        password: password,
      });

      if (response.data) {
        console.log('Password added successfully:', response.data);
        // Handle success, e.g., show a success message
        console.log(`Password added for ${websiteName}`, response.data);
      } else {
        console.error('Failed to add password:', response.data.message);
        // Handle failure, e.g., show an error message
      }
    } catch (error) {
      console.error('Error adding password:', error);
      // Handle network or other errors
    }
  };

  const handleLogout = () => {
    // Perform logout functionality (e.g., redirect to login page)
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
