import mongoose from 'mongoose';

const SecurityStateSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true, default: 'global_auth' },
    globalFailedAttempts: { type: Number, default: 0 },
    globalLockUntil: { type: Number, default: null }
});

const SecurityState = mongoose.model("SecurityState", SecurityStateSchema, "securityState");

export default SecurityState;
