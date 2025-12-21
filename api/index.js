import cors from 'cors';
import express from 'express';
import dotenv from "dotenv"
import connectDB from "./src/config/db.js"
import softwareRoutes from "./src/routes/inventory.software.routes.js"
import hardwareRoutes from "./src/routes/inventory.hardware.routes.js"
import licensesRoutes from "./src/routes/inventory.licenses.routes.js"
import serversRoutes from "./src/routes/inventory.servers.routes.js"
import projectRoutes from "./src/routes/projects.project.routes.js"
import projectUserRoutes from "./src/routes/projects.projectUser.routes.js"
import notificationsRoutes from "./src/routes/communications.notifications.routes.js";
import messagesRoutes from "./src/routes/communications.messages.routes.js";
import chatMessagesRoutes from "./src/routes/comunications.chats.routes.js";
import usersRoutes from "./src/routes/users.user.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import verifyToken from "./src/middleware/auth.middleware.js";
//-----------------------------------------------

dotenv.config();
const PORT = process.env.PORT || 3000;

await connectDB();
const api = express();

api.use(cors());

api.use(express.json());

api.use("/auth", authRoutes);

api.get("/", (req, res) => {
  res.send("Hello, World!");
});

/* API MARC */
api.get("/marc", (req, res) => {
  res.send("Esta es la API de Marc, los datos se encuentran en /users.");
});
api.use("/marc/users", verifyToken, usersRoutes);

/* API OUISSAM */
api.get("/ouissam", (req, res) => {
  res.send(
    "Esta es la API de Ouissam, los datos se encuentran en /hardware, /software, /licenses o /servers.",
  );
});
api.use("/ouissam/software", verifyToken, softwareRoutes);
api.use("/ouissam/hardware", verifyToken, hardwareRoutes);
api.use("/ouissam/licenses", verifyToken, licensesRoutes);
api.use("/ouissam/servers", verifyToken, serversRoutes);

/***************************************/

/* API RICARDO */
api.get("/ricardo", (req, res) => {
  console.log("Extrayendo los datos de proyectos");
});
api.use("/ricardo/projects", verifyToken, projectRoutes);

api.use("/projectsUsers", verifyToken, projectUserRoutes);

/***************************************/

/*API Santos*/
api.use("/santos/notifications", verifyToken, notificationsRoutes);
api.use("/santos/messages", verifyToken, messagesRoutes);
api.use("/santos/chats", verifyToken, chatMessagesRoutes);

/**************/

api.listen(PORT, () => {
  console.log(`API is running at http://localhost:${PORT}`);
});
