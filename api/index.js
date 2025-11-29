import cors from "cors";
import express from "express";
import software from "./data/inventory/software.js";
import hardware from "./data/inventory/hardware.js";
import licenses from "./data/inventory/licenses.js";
import servers from "./data/inventory/servers.js";

const api = express();
const PORT = 3000;

api.use(cors());

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

api.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
