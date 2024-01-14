const db = require('../../data/dbConfig');
const crypto = require('crypto');

async function createPassword(user_id, website_name, password) {
    try {
        //Generate a random key and IV for each password 
         const key = crypto.randomBytes(32);
         const iv = crypto.randomBytes(16);

        //generate a cipher
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);

        //Encrypt the password
        let encryptedPassword = cipher.update(password, 'utf-8', 'hex');
         encryptedPassword += cipher.final('hex');

        // Store the encrypted password in the database
        const [newPassword] = await db('passwords').returning(['id', 'website_name']).insert({
            user_id,
            encrypted_password: encryptedPassword,
            website_name,
        });

        return newPassword;
    } catch (err) {
        console.error('Error creating password:', err);
        throw new Error('Failed to create password');
    }
}

module.exports = {
    createPassword
};
