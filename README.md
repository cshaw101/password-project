![1703822580863](https://github.com/cshaw101/password-project/assets/124619458/7d6d76b3-e3f7-4d4b-81a5-d5e97be0f130)



Features

    - User authentication with JWT (JSON Web Tokens)
    - User registration with password hashing
    - Secure storage of passwords with encryption and decryption
    - Adding, viewing, and deleting passwords
    - Responsive and user-friendly interface
    - Token-based authentication to protect routes
    - Local storage for persistent login state

Getting Started:
Prerequisites

    - Node.js and npm installed on your machine
    - SQLite database

Installation

    git clone git@github.com:cshaw101/password-project.git

Install dependencies:

    cd password-manager-app
    npm install
 

Set up the database:

    npm run migrate

Run the server:

bash

    npm start-server

    The app should now be running on http://localhost:9000.

    
Run the app:

    cd password-app
    npm run start
    
Usage
![Screenshot 2024-01-22 at 3 37 56 PM](https://github.com/cshaw101/password-project/assets/124619458/da4ca349-12ca-484c-989a-6cdaf567596c)

Login

    Access the login page by navigating to http://localhost:9000.
    Enter your username and password to log in.
    Upon successful login, you will be redirected to the main page.

Registration

    If you don't have an account, click on the "Register" button on the login page.
    Enter a unique username and a password (must be longer than 3 characters).
    Click on the "Register" button to create a new account.

![Screenshot 2024-01-22 at 3 38 47 PM](https://github.com/cshaw101/password-project/assets/124619458/8a399115-8358-436d-850e-a3810dd60fee)


Adding Passwords

    On the main page, enter the website name and password in the respective input fields.
    Click on the "Add Password" button to securely store the password.


![Screenshot 2024-01-22 at 3 39 28 PM](https://github.com/cshaw101/password-project/assets/124619458/9e3eb21c-6ace-413a-8302-76b6d0b9bc6d)
![Screenshot 2024-01-22 at 3 39 36 PM](https://github.com/cshaw101/password-project/assets/124619458/a1ec2e77-35be-4fc1-959c-0b0e0e0c78ec)


Viewing and Deleting Passwords

    All stored passwords are displayed on the main page.
    Click on a password to reveal its decrypted version.
    Click on the "Delete" button next to a password to remove it.

Logout

    Click on the "Log Out" button to log out of the application.
    You will be redirected to the login page.

Technology Stack

    - React
    - Node.js
    - Express
    - SQLite
    - JWT (JSON Web Tokens)
    - Bcrypt for password hashing
    - Crypto for encryption and decryption
