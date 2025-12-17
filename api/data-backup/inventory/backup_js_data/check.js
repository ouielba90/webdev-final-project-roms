import { software } from "./software.js";
import { hardware } from "./hardware.js";
import { servers } from "./servers.js";

software.forEach((sw) => {
  // Verificar installedOnHardware
  sw.installedOnHardware.forEach((hwId) => {
    const existsInHardware = hardware.some(
      (hw) => hw.id === hwId && hw.installedSoftware.includes(sw.id),
    );
    if (!existsInHardware) {
      console.log(
        `Error: software "${sw.name}" (${sw.id}) no coincide con hardware ${hwId}`,
      );
    }
  });

  // Verificar serverId
  sw.serverId.forEach((srvId) => {
    const server = servers.find((s) => s.id === srvId);
    if (!server || !server.hostedSoftware.includes(sw.id)) {
      console.log(
        `Error: software "${sw.name}" (${sw.id}) no coincide con servidor ${srvId}`,
      );
    }
  });
});
