const router = require('express').Router()

router.get('/', (req, res) => {
    console.log("users is working")
})


module.exports = router;


//add more routes for the users endpoint. need login and register

//also make a new endpoint for passwords to be saved

//need to make db actions as well.

//work on backend first and then front end