const router = require('express').Router()
const db = require('../../data/dbConfig')
const { createPassword, getPasswordByUserId, deletePassword } = require('./passwords-model')



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

    if(!id) {
        return res.status(400).json({ error: 'Bad Request', message: 'Invalid or missing ID' });
    }

    try{
        const passwords = await getPasswordByUserId(id);
        res.status(200).json(passwords)

    }catch(err) {
        console.error('Error getting passwords:', err);
        res.status(500).json({ message: 'Failed to get passwords' });
    }
    next()
})

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Bad Request', message: 'Invalid or missing ID' });
    }

    try {
        // Check if the password exists before deleting
        const passwordExists = await db('passwords').where({ id }).first();

        if (!passwordExists) {
            return res.status(404).json({ error: 'Not Found', message: 'Password not found' });
        }

        const deletedPassword = await deletePassword(id);
        res.status(200).json(deletedPassword);
    } catch (err) {
        console.error('Error deleting password:', err);
        res.status(500).json({ message: 'Failed to delete password' });
    }
});



module.exports = router;