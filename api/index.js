
import notifications from "./data/notifications.data.js";
import messages from "./data/messages.data.js"
import chatMessages from "./data/chatMessages.data.js";
import posts from "./data/post.data.js";
import cors from "cors";
import express from "express";
const api = express();
const PORT = 3000;

api.get("/", (req, res) => {
    res.send("Hello Word");
});

api.listen(PORT, () => {
    console.log(`Api server runnig at http://localhost:${PORT}`)
})

api.get("/posts", (req, res) => {
    res.json(posts);
})
api.get("/notifications", (req, res) => {
    res.json(notifications);
})
api.get("/messages", (req, res) => {
    res.json(messages);
})
api.get("/chat-messages", (req, res) => {
    res.json(chatMessages);
})

