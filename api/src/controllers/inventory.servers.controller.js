import ServersPost from "./../models/inventory.servers.model.js"

const getServers = async (req, res) => {
    try {
        const posts = await ServersPost.find().populate("hostedSoftware").lean();
        res.json(posts);
    } catch (err) {
        console.error("[ERROR] GET /ouissam/servers:", err);
        res.json({ error: "DB_ERROR (servers)" });
    }
}

const getAServer = async (req, res) => {
    try {
        const id = req.params.id
        const posts = await ServersPost.findById(id).populate("hostedSoftware").lean();
        res.json(posts);
    } catch (err) {
        console.error(`[ERROR] GET /ouissam/servers/${id}`, err);
        res.json({ error: "DB_ERROR (servers)" });
    }
}

const createServer = async (req, res) => {
    try {
        const postData = req.body;
        const newPost = new ServersPost(postData);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        console.error("[ERROR] POST /ouissam/servers:", err);
        res.status(500).json({ error: "DB_ERROR (servers)" });
    }
}

const deleteServer = async (req, res) => {
    try {
        const postId = req.params.id
        const deletedPost = await ServersPost.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: "POST_NOT_FOUND" });
        }
        return res.json(deletedPost);
    } catch (err) {
        console.error("[ERROR] DELETE /ouissam/servers/:id:", err);
        return res.status(500).json({ error: "DB_ERROR" });
    }
}
const updateServer = async (req, res) => {
    try {
        const postId = req.params.id
        const updateData = req.body;
        const post = await ServersPost.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "POST_NOT_FOUND" });
        }
        post.set(updateData);
        const updatedPost = await post.save();
        return res.json(updatedPost);
    } catch (err) {
        console.error("[ERROR] PUT /ouissam/servers/:id:", err);
        return res.status(500).json({ error: "DB_ERROR" });
    }
};

export default {
    getServers,
    getAServer,
    createServer,
    deleteServer,
    updateServer
}