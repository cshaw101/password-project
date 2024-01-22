const crypto = require('crypto');
const db = require('../../data/dbConfig');
const cryptoConfig = require('../../cryptoConfig');

const key = Buffer.from(cryptoConfig.DECRYPTION_KEY, 'hex');
const iv = cryptoConfig.IV;
const algorithm = 'aes-256-cbc';

async function createPassword(user_id, website_name, password) {
    try {
        // Generate a new random IV for each password
        const passwordIV = crypto.randomBytes(16).toString('hex');

        const cipher = crypto.createCipheriv(algorithm, key, Buffer.from(passwordIV, 'hex'));
        let encryptedPassword = cipher.update(password, 'utf-8', 'hex');
        encryptedPassword += cipher.final('hex');
       

        const [newPassword] = await db('passwords').returning(['id', 'website_name']).insert({
            user_id,
            encrypted_password: encryptedPassword,
            website_name,
            iv: passwordIV,
        });

        return newPassword;
    } catch (err) {
        throw new Error('Failed to create password');
    }
}
async function getPasswordByUserId(user_id) {
    try {

        const passwords = await db('passwords').select(['id', 'website_name', 'encrypted_password', 'iv']).where({ user_id });

        const decryptedPasswords = [];

        for (const password of passwords) {
            try {

                const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(password.iv, 'hex'));

                let decryptedPassword = '';
                decryptedPassword += decipher.update(password.encrypted_password, 'hex', 'utf-8');
                decryptedPassword += decipher.final('utf-8');

                decryptedPasswords.push({
                    id: password.id,
                    website_name: password.website_name,
                    decrypted_password: decryptedPassword,
                });
            } catch (decryptError) {
                decryptedPasswords.push({
                    id: password.id,
                    website_name: password.website_name,
                    decrypted_password: null,
                });
            }
        }

        return decryptedPasswords;
    } catch (err) {
        throw new Error('Failed to get passwords');
    }
}

async function deletePassword(passwordId) {
    try {
        const deletedPassword = await db('passwords')
            .where({ id: passwordId })
            .del()
            .returning(['id', 'website_name']);

        return deletedPassword;
    } catch (err) {
        throw new Error('Failed to delete password');
    }
}


module.exports = {
    createPassword,
    getPasswordByUserId,
    deletePassword
};
