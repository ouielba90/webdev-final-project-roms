import cors from 'cors';
import express from 'express';
import users from './data/users.data.js';

const api = express();
const PORT = 1234;

api.use(cors());

api.get("/", (req, res) => {
    res.send("Hello, World!");
});

api.get("/users", (req, res) => {
    res.json(users)
})

api.listen(PORT, () => {
    console.log(`API is running at [http://localhost:${PORT}](http://localhost:${PORT})`);
});