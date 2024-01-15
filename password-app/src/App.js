import React from 'react';
import Login from "./components/loginForm";
import MainPage from './components/mainPage';

function App() {
  return (
    <>
      <Login />
      <MainPage />
    </>
  )
}

export default App;

//add routes in the app to navigate from login page to main page 
//display the passwords of the users along with the name of the website
//add in tons of middleware and protective cases to prevent user errors
//add in log out function
