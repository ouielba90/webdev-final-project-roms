import HardwarePost from "./../models/inventory.hardware.model.js"

const getHardware = async (req, res) => {
    try {
        const posts = await HardwarePost.find().lean();
        res.json(posts);
    } catch (err) {
        console.error("[ERROR] GET /ouissam/hardware:", err);
        res.json({ error: "DB_ERROR (hardware)" });
    }
}

const getAHardware = async (req, res) => {
    try {
        const id = req.params.id
        const posts = await HardwarePost.findById(id).lean();
        res.json(posts);
    } catch (err) {
        console.error(`[ERROR] GET /ouissam/hardware/${id}`, err);
        res.json({ error: "DB_ERROR (hardware)" });
    }
}

const createHardware = async (req, res) => {
    try {
        const postData = req.body;
        const newPost = new HardwarePost(postData);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        console.error("[ERROR] POST /ouissam/hardware:", err);
        res.status(500).json({ error: "DB_ERROR (hardware)" });
    }
}

const deleteHardware = async (req, res) => {
    try {
        const postId = req.params.id
        const deletedPost = await HardwarePost.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: "POST_NOT_FOUND" });
        }
        return res.json(deletedPost);
    } catch (err) {
        console.error("[ERROR] DELETE /ouissam/hardware/:id:", err);
        return res.status(500).json({ error: "DB_ERROR" });
    }
}
const updateHardware = async (req, res) => {
    try {
        const postId = req.params.id
        const updateData = req.body;
        const post = await HardwarePost.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "POST_NOT_FOUND" });
        }
        post.set(updateData);
        const updatedPost = await post.save();
        return res.json(updatedPost);
    } catch (err) {
        console.error("[ERROR] PUT /ouissam/hardware/:id:", err);
        return res.status(500).json({ error: "DB_ERROR" });
    }
};

export default {
    getHardware,
    getAHardware,
    createHardware,
    deleteHardware,
    updateHardware
}