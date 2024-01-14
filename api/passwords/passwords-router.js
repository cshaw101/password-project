const router = require('express').Router()
const { createPassword, getPasswordByUserId } = require('./passwords-model')



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


router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try{
        const passwords = await getPasswordByUserId(id);
        res.status(200).json(passwords)

    }catch(err) {
        console.error('Error getting passwords:', err);
        res.status(500).json({ message: 'Failed to get passwords' });
    }
})



module.exports = router;