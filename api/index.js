import cors from 'cors';
import express from 'express';
import dotenv from "dotenv"
import connectDB from "./src/config/db.js"
import SoftwarePost from "./src/models/inventory.software.model.js"
import HardwarePost from "./src/models/inventory.hardware.model.js"
import LicensesPost from "./src/models/inventory.licenses.model.js"
import ServersPost from "./src/models/inventory.servers.model.js"
import users from './data/users.data.js';
import projects from "./data/projects.data.js";
import projectsUsers from "./data/projectsUsers.data.js";
import software from "./data/inventory/software.js";
import hardware from "./data/inventory/hardware.js";
import licenses from "./data/inventory/licenses.js";
import servers from "./data/inventory/servers.js";
import notifications from "./data/notifications.data.js";
import messages from "./data/messages.data.js"
import chatMessages from "./data/chatMessages.data.js";
import posts from "./data/post.data.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

await connectDB();
const api = express();

api.use(cors());

api.use(express.json());


/* API MARC */
api.get("/", (req, res) => {
  res.send("Hello, World!");
});

api.get("/marc", (req, res) => {
  res.send("Esta es la API de Marc, los datos se encuentran en /users.");
});

api.get("/marc/users", (req, res) => {
  res.json(users)
})

/* API OUISSAM FALTA MANEJO DE ERRORES */
api.get("/ouissam", (req, res) => {
  res.send(
    "Esta es la API de Ouissam, los datos se encuentran en /hardware, /software, /licenses o /servers.",
  );
});

api.get("/ouissam/software", async (req, res) => {
  try {
    const posts = await SoftwarePost.find().lean();
    res.json(posts);
  } catch (err) {
    console.error("[ERROR] GET /ouissam/software:", err);
    res.json({ error: "DB_ERROR" });
  }
});

api.get("/ouissam/hardware", async (req, res) => {
  try {
    const posts = await HardwarePost.find().lean();
    res.json(posts);
  } catch (err) {
    console.error("[ERROR] GET /ouissam/hardware:", err);
    res.json({ error: "DB_ERROR" });
  }
});

api.get("/ouissam/licenses", async (req, res) => {
  try {
    const posts = await LicensesPost.find().lean();
    res.json(posts);
  } catch (err) {
    console.error("[ERROR] GET /ouissam/licenses:", err);
    res.json({ error: "DB_ERROR" });
  }
});

api.get("/ouissam/servers", async (req, res) => {
  try {
    const posts = await ServersPost.find().lean();
    res.json(posts);
  } catch (err) {
    console.error("[ERROR] GET /ouissam/servers:", err);
    res.json({ error: "DB_ERROR" });
  }
});
/***************************************/

/* API RICARDO */
api.get("/projects", (req, res) => {
  console.log("Extrayendo los datos de proyectos");
  res.json(projects);
});

api.get("/projectsUsers", (req, res) => {
  console.log("Extrayendo los datos de usuarios asignados a proyectos");
  res.json(projectsUsers);
});

/*API Santos*/
api.get("/notifications", (req, res) => {
  res.json(notifications);
})
api.get("/messages", (req, res) => {
  res.json(messages);
})
api.get("/chat-messages", (req, res) => {
  res.json(chatMessages);
})
api.get("/posts", (req, res) => {
  res.json(chatMessages);
})
/**************/

api.listen(PORT, () => {
  console.log(`API is running at [http://localhost:${PORT}](http://localhost:${PORT})`);
});
