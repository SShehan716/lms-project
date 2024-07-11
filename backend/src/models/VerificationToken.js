const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const verificationTokenSchema = new Schema({
    userEmail: {
        type: String,
        required: true,
        unique: true,        
    },
    token: {
        type: String,
        required: true,
        unique: true,
    },
    expiresAt: {
        type: Date,
        default: () => Date.now() + 3600000,
        index: { expires: '1h' },
    },
});

module.exports = mongoose.model('VerificationToken', verificationTokenSchema);