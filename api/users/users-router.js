const router = require('express').Router()
const Users =  require('../users/user-model')


router.post('/login', (req, res, next) => {
    console.log("login is working")
})

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if username already exists
      const existingUser = await Users.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Create a new user
      const newUser = await Users.createUser(username, password);
      res.status(201).json({ 
        id: newUser.id,
        username: newUser.username,
        password: newUser.password 
      });
    } catch (err) {
      console.error('Error during registration:', err);
      res.status(500).json({ message: 'Registration failed' });
    }
  });


module.exports = router;


//add more routes for the users endpoint. need login and register

//also make a new endpoint for passwords to be saved

//need to make db actions as well.

//work on backend first and then front end