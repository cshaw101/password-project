const router = require('express').Router();
const Users = require('./user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../secrets/index');


router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  try {
    const user = await Users.getUserByUsername(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      req.user = user;

      const token = buildToken(req.user);

      // Save token and user ID in local storage
      res.status(200).json({ message: `Welcome, ${user.username}`, token, userId: user.id });
    } else {
      res.status(401).json({ message: 'Username or password is incorrect' });
    }
  } catch (err) {
    console.error('Error during login', err);
    res.status(500).json({ message: 'Internal Server Error' });
    next(err);
  }
});

router.post('/register', /*checkPasswordLength, checkCreds,*/ async (req, res) => {
  console.log('Received registration request'); 

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
      password: newUser.password,
    });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Registration failed' });
    next(err)
  }
});

function buildToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: '1h',
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = router;
