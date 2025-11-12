function ServerCard({ name, hardwareId, ip, os, cpuCores, ramGb, diskTb, uptimeDays }) {
  return (
    <div>
      <div>Nombre: {name}</div>
      <div>Hardware: {hardwareId}</div>
      <div>IP: {ip}</div>
      <div>OS: {os}</div>
      <div>CPU cores: {cpuCores}</div>
      <div>RAM: {ramGb}</div>
      <div>Disk: {diskTb}</div>
      <div>Activo: {uptimeDays}</div>
      <hr />
    </div>
  )
}

export default ServerCard
