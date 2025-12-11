import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    id: { type: Number },
    name: { type: String, required: true },
    id_project: { type: Number },
});

export default mongoose.model("ProjectsUserPost", projectSchema, "projectsUsers");