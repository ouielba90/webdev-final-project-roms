import ProjectsUserPost from './../models/projects.projectUser.model.js';

const getProjectsUsers = async (req, res) => {
    try {
        const posts = await ProjectsUserPost.find().lean();

        res.json(posts);
    }
    catch (err) {
        console.error("[ERROR] GET /projectsUsers:", err);
        res.json({ error: "DB_ERROR (projectsUsers)" });
    }
}

const getAProjectsUsers = async (req, res) => {
    try {
        const id = req.params.id
        const post = await ProjectsUserPost.findById(id).lean();
        
        res.json(post);
    }
    catch (err) {
        console.error(`[ERROR] GET /projectsUsers/${id}:`, err);
        res.json({ error: "DB_ERROR (projectsUsers)" });
    }
}

export default {
    getProjectsUsers,
    getAProjectsUsers
}