import UsersPost from './../models/users.user.model.js';

const getUsers = async (req, res) => {
    try {
        const posts = await UsersPost.find().lean();

        res.json(posts);
    }
    catch (err) {
        console.error("[ERROR] GET /Users:", err);
        res.json({ error: "DB_ERROR (Users)" });
    }
}

const getAUsers = async (req, res) => {
    try {
        const id = req.params.id
        const post = await UsersPost.findById(id).lean();
        
        res.json(post);
    }
    catch (err) {
        console.error(`[ERROR] GET /Users/${id}:`, err);
        res.json({ error: "DB_ERROR (Users)" });
    }
}

const createUser = async (req, res) => {
    try {
        console.log("Cuerpo de la solicitud de creación:", req.body);
        const postData = req.body;
        const newPost = new UsersPost(postData);
        const savedPost = await newPost.save();
        
        res.status(201).json(savedPost);
    } 
    catch (err) {
        console.error("[ERROR] POST /users:", err);
        res.status(500).json({ error: "DB_ERROR (users)" });
    }
}

const updateUser = async (req, res) => {
    try {
        console.log("Cuerpo de la solicitud de actualización:", req.body);
        const postId = req.params.id
        const updateData = req.body;
        const post = await UsersPost.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "POST_NOT_FOUND" });
        }
        post.set(updateData);
        const updatedPost = await post.save();
        
        return res.json(updatedPost);
    }
    catch (err) {
        console.error("[ERROR] PUT /users/:id:", err);
        return res.status(500).json({ error: "DB_ERROR" });
    }
}

const deleteUser = async (req, res) => {
    try {
        const postId = req.params.id
        console.log("Intentando eliminar el proyecto con ID:", postId);
        const deletedPost = await UsersPost.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: "POST_NOT_FOUND" });
        }

        return res.json(deletedPost);
    } 
    catch (err) {
        console.error("[ERROR] DELETE /users/:id:", err);
        return res.status(500).json({ error: "DB_ERROR" });
    }
}
export default {
    getUsers,
    getAUsers,
    createUser,
    updateUser,
    deleteUser
}