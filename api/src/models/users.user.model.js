import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    role: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, required: false }
});

const User = mongoose.model("UsersPost", UsersSchema, "users");

export default User;