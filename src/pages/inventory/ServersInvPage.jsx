import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import ServerCard from "../../components/inventory/ServerCard";

function ServersInvPage() {
  const { servers } = useContext(DataContext)
  return (
    <>
      <h1>Servers</h1>
      {servers.map((el) => {
        return (
          <ServerCard
            name={el.name}
            hardwareId={el.hardwareId}
            ip={el.ip}
            os={el.os}
            cpuCores={el.cpuCores}
            ramGb={el.ramGb}
            diskTb={el.diskTb}
            uptimeDays={el.uptimeDays}
          />
        )
      })}
    </>
  )
}

export default ServersInvPage
