import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    id: { type: String},
    name: { type: String, required: true },
    client: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },
    tasks: [
        {
            type: String
        }
    ]
});

export default mongoose.model("ProjectsPost", projectSchema, "projects");