const router = require('express').Router()
const { createPassword } = require('./passwords-model')



router.post('/', async  (req, res, next) => {
    const { user_id, website_name, password } = req.body
try {
    const newPassword = await createPassword(user_id, website_name, password);

res.status(200).json(newPassword)
}catch(err) {
console.error('Error adding password:', err)
res.status(500).json({ message: 'Failed to add password' })
}

})






router.get('/', async (req, res, next) => {
    console.log('getting passwords correctly')
})



module.exports = router;