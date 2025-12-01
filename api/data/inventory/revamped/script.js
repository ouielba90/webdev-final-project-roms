// Pega aquí tus tres arrays originales: `software`, `servers`, `hardware`
// (los que me pasaste). El script los actualizará in-place y devolverá
// los arrays reconciliados.

function reconcile(software, servers, hardware) {
  // Map swId -> hardwareIds según hardware.installedSoftware
  const swHardwareFromHardware = new Map();
  for (const h of hardware) {
    const hid = h.id;
    if (!Array.isArray(h.installedSoftware)) continue;
    for (const sw of h.installedSoftware) {
      if (!swHardwareFromHardware.has(sw))
        swHardwareFromHardware.set(sw, new Set());
      swHardwareFromHardware.get(sw).add(hid);
    }
  }

  // Map swId -> hardwareIds según software.installedOnHardware
  const swHardwareFromSoftware = new Map();
  for (const s of software) {
    swHardwareFromSoftware.set(
      s.id,
      new Set((s.installedOnHardware || []).slice()),
    );
  }

  // Final: unión de ambos -> actualizar software.installedOnHardware
  for (const s of software) {
    const fromH = swHardwareFromHardware.get(s.id) || new Set();
    const fromS = swHardwareFromSoftware.get(s.id) || new Set();
    const union = new Set([...fromH, ...fromS]);
    s.installedOnHardware = Array.from(union).sort((a, b) => a - b);
  }

  // Ahora reconstruir hardware.installedSoftware a partir de software.installedOnHardware
  const hwInstalls = new Map(); // hid -> Set(swId)
  for (const s of software) {
    for (const hid of s.installedOnHardware || []) {
      if (!hwInstalls.has(hid)) hwInstalls.set(hid, new Set());
      hwInstalls.get(hid).add(s.id);
    }
  }
  for (const h of hardware) {
    const set = hwInstalls.get(h.id) || new Set();
    h.installedSoftware = Array.from(set).sort((a, b) => a - b);
  }

  // --- servidores <-> software (similar)
  // Map swId -> serverIds según servers.hostedSoftware
  const swServersFromServers = new Map();
  for (const srv of servers) {
    const sid = srv.id;
    if (!Array.isArray(srv.hostedSoftware)) continue;
    for (const sw of srv.hostedSoftware) {
      if (!swServersFromServers.has(sw))
        swServersFromServers.set(sw, new Set());
      swServersFromServers.get(sw).add(sid);
    }
  }

  // Map swId -> serverIds según software.serverId (inicial)
  const swServersFromSoftware = new Map();
  for (const s of software) {
    swServersFromSoftware.set(s.id, new Set((s.serverId || []).slice()));
  }

  // Final: unión -> actualizar software.serverId
  for (const s of software) {
    const fromSrv = swServersFromServers.get(s.id) || new Set();
    const fromS = swServersFromSoftware.get(s.id) || new Set();
    const union = new Set([...fromSrv, ...fromS]);
    s.serverId = Array.from(union).sort((a, b) => a - b);
  }

  // Ahora reconstruir servers.hostedSoftware desde software.serverId
  const serverHosts = new Map(); // sid -> Set(swId)
  for (const s of software) {
    for (const sid of s.serverId || []) {
      if (!serverHosts.has(sid)) serverHosts.set(sid, new Set());
      serverHosts.get(sid).add(s.id);
    }
  }
  for (const srv of servers) {
    const set = serverHosts.get(srv.id) || new Set();
    srv.hostedSoftware = Array.from(set).sort((a, b) => a - b);
  }

  // Devuelve los arrays actualizados
  return { software, servers, hardware };
}

// Uso:
import { writeFile } from "fs/promises";

// Importa tus arrays
import software from "./software.js";
import servers from "./servers.js";
import hardware from "./hardware.js";

// Ejecutas la reconciliación
const result = reconcile(software, servers, hardware);

// Guardar cada archivo como *_updated.js usando ES modules
await writeFile(
  "./software_updated.js",
  "export default " + JSON.stringify(result.software, null, 2) + ";\n",
);

await writeFile(
  "./servers_updated.js",
  "export default " + JSON.stringify(result.servers, null, 2) + ";\n",
);

await writeFile(
  "./hardware_updated.js",
  "export default " + JSON.stringify(result.hardware, null, 2) + ";\n",
);

console.log("Archivos generados:");
console.log("- software_updated.js");
console.log("- servers_updated.js");
console.log("- hardware_updated.js");
