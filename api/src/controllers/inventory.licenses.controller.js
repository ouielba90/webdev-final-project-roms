import LicensesPost from "./../models/inventory.licenses.model.js"

const getLicenses = async (req, res) => {
    try {
        const posts = await LicensesPost.find().populate("softwareId").lean();
        res.json(posts);
    } catch (err) {
        console.error("[ERROR] GET /ouissam/licenses:", err);
        res.json({ error: "DB_ERROR (licenses)" });
    }
}

const getALicense = async (req, res) => {
    try {
        const id = req.params.id
        const posts = await LicensesPost.findById(id).populate("softwareId").lean();
        res.json(posts);
    } catch (err) {
        console.error(`[ERROR] GET /ouissam/licenses/${id}`, err);
        res.json({ error: "DB_ERROR (licenses)" });
    }
}

const createLicense = async (req, res) => {
    try {
        const postData = req.body;
        const newPost = new LicensesPost(postData);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        console.error("[ERROR] POST /ouissam/licenses:", err);
        res.status(500).json({ error: "DB_ERROR (licenses)" });
    }
}

const deleteLicense = async (req, res) => {
    try {
        const postId = req.params.id
        const deletedPost = await LicensesPost.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: "POST_NOT_FOUND" });
        }
        return res.json(deletedPost);
    } catch (err) {
        console.error("[ERROR] DELETE /ouissam/licenses/:id:", err);
        return res.status(500).json({ error: "DB_ERROR" });
    }
}
const updateLicense = async (req, res) => {
    try {
        const postId = req.params.id
        const updateData = req.body;
        const post = await LicensesPost.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "POST_NOT_FOUND" });
        }
        post.set(updateData);
        const updatedPost = await post.save();
        return res.json(updatedPost);
    } catch (err) {
        console.error("[ERROR] PUT /ouissam/licenses/:id:", err);
        return res.status(500).json({ error: "DB_ERROR" });
    }
};

export default {
    getLicenses,
    getALicense,
    createLicense,
    deleteLicense,
    updateLicense
}