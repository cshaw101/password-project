const crypto = require('crypto');
const DECRYPTION_KEY = crypto.randomBytes(32).toString('hex');
const IV = Buffer.from('1280529a0013afd4c6009a62173ac937', 'hex');  

module.exports = {
    DECRYPTION_KEY,
    IV,
};
