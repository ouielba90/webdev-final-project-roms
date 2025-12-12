import ProjectsPost from "../models/projects.project.model.js";

const getProjects = async (req, res) => {
    try {
        const posts = await ProjectsPost.find().lean();

        res.json(posts);
    }
    catch (err) {
        console.error("[ERROR] GET /projects:", err);
        res.json({ error: "DB_ERROR (projects)" });
    }
}

const getAProjects = async (req, res) => {
    try {
        const id = req.params.id
        const post = await ProjectsPost.findById(id).lean();
        
        res.json(post);
    }
    catch (err) {
        console.error(`[ERROR] GET /projects/${id}:`, err);
        res.json({ error: "DB_ERROR (projects)" });
    }
}

const createProject = async (req, res) => {
    try {
        const postData = req.body;
        const newPost = new ProjectsPost(postData);
        const savedPost = await newPost.save();
        
        res.status(201).json(savedPost);
    } 
    catch (err) {
        console.error("[ERROR] POST /projects:", err);
        res.status(500).json({ error: "DB_ERROR (projects)" });
    }
}

const updateProject = async (req, res) => {
    try {
        const postId = req.params.id
        const updateData = req.body;
        const post = await ProjectsPost.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "POST_NOT_FOUND" });
        }
        post.set(updateData);
        const updatedPost = await post.save();
        
        return res.json(updatedPost);
    }
    catch (err) {
        console.error("[ERROR] PUT /projects/:id:", err);
        return res.status(500).json({ error: "DB_ERROR" });
    }
}

const deleteProject = async (req, res) => {
    try {
        const postId = req.params.id
        console.log("Intentando eliminar el proyecto con ID:", postId);
        const deletedPost = await ProjectsPost.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: "POST_NOT_FOUND" });
        }

        return res.json(deletedPost);
    } 
    catch (err) {
        console.error("[ERROR] DELETE /projects/:id:", err);
        return res.status(500).json({ error: "DB_ERROR" });
    }
}

export default {
    getProjects,
    getAProjects,
    createProject,
    updateProject,
    deleteProject
}