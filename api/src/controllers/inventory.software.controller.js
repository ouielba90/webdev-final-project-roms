import SoftwarePost from "./../models/inventory.software.model.js"

const getSoftware = async (req, res) => {
    try {
        const posts = await SoftwarePost.find().populate(["licenseId", "installedOnHardware", "serverId"]).lean();
        res.json(posts);
    } catch (err) {
        console.error("[ERROR] GET /ouissam/software:", err);
        res.json({ error: "DB_ERROR (software)" });
    }
}

const getASoftware = async (req, res) => {
    try {
        const id = req.params.id
        const posts = await SoftwarePost.findById(id).populate(["licenseId", "installedOnHardware", "serverId"]).lean();
        res.json(posts);
    } catch (err) {
        console.error(`[ERROR] GET /ouissam/software/${id}`, err);
        res.json({ error: "DB_ERROR (software)" });
    }
}

const createSoftware = async (req, res) => {
    try {
        const postData = req.body;
        const newPost = new SoftwarePost(postData);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        console.error("[ERROR] POST /ouissam/software:", err);
        res.status(500).json({ error: "DB_ERROR (software)" });
    }
}

const deleteSoftware = async (req, res) => {
    try {
        const postId = req.params.id
        const deletedPost = await SoftwarePost.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: "POST_NOT_FOUND" });
        }
        return res.json(deletedPost);
    } catch (err) {
        console.error("[ERROR] DELETE /ouissam/software/:id:", err);
        return res.status(500).json({ error: "DB_ERROR" });
    }
}
const updateSoftware = async (req, res) => {
    try {
        const postId = req.params.id
        const updateData = req.body;
        const post = await SoftwarePost.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "POST_NOT_FOUND" });
        }
        post.set(updateData);
        const updatedPost = await post.save();
        return res.json(updatedPost);
    } catch (err) {
        console.error("[ERROR] PUT /ouissam/software/:id:", err);
        return res.status(500).json({ error: "DB_ERROR" });
    }
};

export default {
    getSoftware,
    getASoftware,
    createSoftware,
    deleteSoftware,
    updateSoftware
};