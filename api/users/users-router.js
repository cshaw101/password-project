const router = require('express').Router()

router.post('/login', (req, res, next) => {
    console.log("login is working")
})

router.post('/register', (req, res, next) => {
    console.log("register is working")
})



module.exports = router;


//add more routes for the users endpoint. need login and register

//also make a new endpoint for passwords to be saved

//need to make db actions as well.

//work on backend first and then front end