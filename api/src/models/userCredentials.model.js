import mongoose from "mongoose";

const UserCredentialsSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: { type: Number }
});

const UserCredentials = mongoose.model("UserCredentials", UserCredentialsSchema, "userCredentials");

export default UserCredentials;
