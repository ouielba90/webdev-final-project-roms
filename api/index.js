import cors from 'cors';
import express from 'express';
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

const api = express();
const PORT = 3000;

api.use(cors());

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

api.get("/ouissam/software", (req, res) => {
  res.json(software);
});

api.get("/ouissam/hardware", (req, res) => {
  res.json(hardware);
});

api.get("/ouissam/licenses", (req, res) => {
  res.json(licenses);
});

api.get("/ouissam/servers", (req, res) => {
  res.json(servers);
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
