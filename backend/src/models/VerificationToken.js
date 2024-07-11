const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const verificationTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
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