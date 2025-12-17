import cors from 'cors';
import express from 'express';
import dotenv from "dotenv"
import connectDB from "./src/config/db.js"
import softwareRoutes from "./src/routes/inventory.software.routes.js"
import hardwareRoutes from "./src/routes/inventory.hardware.routes.js"
import licensesRoutes from "./src/routes/inventory.licenses.routes.js"
import serversRoutes from "./src/routes/inventory.servers.routes.js"
import users from './data/users.data.js';
// Importacion de los projectos en la data de api
import projects from "./data/projects.data.js";
import projectsUsers from "./data/projectsUsers.data.js";
//-----------------------------------------------
import projectRoutes from "./src/routes/projects.project.routes.js"
import projectUserRoutes from "./src/routes/projects.projectUser.routes.js"
import notificationsRoutes from "./src/routes/communications.notifications.routes.js";
import messagesRoutes from "./src/routes/communications.messages.routes.js";
import chatMessagesRoutes from "./src/routes/comunications.chats.routes.js";

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

/* API OUISSAM */
api.get("/ouissam", (req, res) => {
  res.send(
    "Esta es la API de Ouissam, los datos se encuentran en /hardware, /software, /licenses o /servers.",
  );
});

api.use("/ouissam/software", softwareRoutes);
api.use("/ouissam/hardware", hardwareRoutes);
api.use("/ouissam/licenses", licensesRoutes);
api.use("/ouissam/servers", serversRoutes);

/***************************************/

/* API RICARDO */
api.get("/ricardo", (req, res) => {
  console.log("Extrayendo los datos de proyectos");
});
api.use("/ricardo/projects", projectRoutes);

api.use("/projectsUsers", projectUserRoutes);

/***************************************/


/*API Santos*/
api.use("/santos/notifications", notificationsRoutes);
api.use("/santos/messages", messagesRoutes);
api.use("/santos/chats", chatMessagesRoutes);


/**************/

api.listen(PORT, () => {
  console.log(`API is running at http://localhost:${PORT}`);
});
