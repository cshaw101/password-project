const router = require('express').Router()
const Users =  require('../users/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../secrets')

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    

    if (!username || !password) {
      return res.status(400).json({ message:"username and password required"})

    }
    try {
      const user = await Users.getUserByUsername(username);
      if (user && bcrypt.compareSync(password, user.password)) {
        req.user = user
        
        const token = buildToken(req.user)
        res.status(200).json({ message: `Welcome, ${user.username}`, token})
      }else {
        res.status(401).json({ message: 'Username or password is incorrect' })
      }
    }catch(err) {
       console.error('Error during login', err);
       res.status(500).json({ message: 'Internal Server Error'});
       next(err)
    }
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



  function buildToken(user){
    const payload = {
      subject: user.id,
      username: user.username,
    };
    const options = {
      expiresIn: '1d',
    }
    return jwt.sign(payload, JWT_SECRET, options)
  }


module.exports = router;


//add more routes for the users endpoint. need login and register

//also make a new endpoint for passwords to be saved

//need to make db actions as well.

//work on backend first and then front end