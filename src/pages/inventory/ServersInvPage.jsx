import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import ServerCard from "../../components/inventory/ServerCard";

function ServersInvPage() {
  const { servers, software } = useContext(DataContext)
  const [query, setQuery] = useState(servers)
  const [status, setStatus] = useState("")

  useEffect(() => {
    let filtered = servers.filter(
      (el) => {
        const matchesStatus = status === "" || el.status === status

        return matchesStatus
      })

    setQuery(filtered);
  }, [servers, status]);

  function handleStatus(e) {
    setStatus(e.target.value)
  }
  return (
    <>
      <h1>Servers</h1>
      <select onClick={handleStatus}>
        <option></option>
        <option>active</option>
        <option>maintenance</option>
      </select>
      {query.map((el) => {
        return (
          <ServerCard
            key={el.id}
            name={el.name}
            ip={el.ip}
            location={el.location}
            os={el.os}
            status={el.status}
            numberOfNodes={el.numberOfNodes}
            nodeSpecs={el.nodeSpecs}
            hostedSoftware={el.hostedSoftware.map((hS) =>
              software.find((s) => hS === s.id).name)}
            usersWithAccess={el.usersWithAccess}
            connectedUsers={el.connectedUsers}
          />
        )
      })}
    </>
  )
}

export default ServersInvPage
