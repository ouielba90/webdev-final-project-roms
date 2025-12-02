import { useContext, useState } from "react";
import { DataContext } from "../../context/inventory/DataContext";
import ServerCard from "../../components/inventory/ServerCard";

function ServersInvPage() {
  const { servers, software } = useContext(DataContext)
  const [az, setAZ] = useState(false)
  const [za, setZA] = useState(false)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [os, setOs] = useState("")

  let filtered = servers.filter(
    (el) => {
      const matchesSearch = el.name.toLowerCase().includes(search.toLowerCase()) ||
        el.ip.includes(search)
      const marchesOs = os === "" || os === "Todos" || el.os.includes(os)
      const matchesStatus = status === "" || status === "Todos" || el.status === status

      return matchesSearch && marchesOs && matchesStatus
    })
    .sort((a, b) => {
      if (az) return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      if (za) return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
      return 0;
    })

  function handleSearch(e) {
    setSearch(e.target.value)
  }

  function handleStatus(e) {
    setStatus(e.target.value)
  }

  return (
    <>
      <div className="software-main-container">
        <div className="filters-container">
          <div className="filters-row-main">
            <input type="text" id="searchForm" placeholder="Buscar servidor..." onChange={handleSearch} />
            <div className="filter-field">
              <p>OS</p>
              <select onClick={(e) => setOs(e.target.value)}>
                <option>Todos</option>
                <option>CentOS</option>
                <option>Debian</option>
                <option>Rocky Linux</option>
                <option>Ubuntu</option>
              </select>
            </div>
            <div className="filter-field">
              <p>Estado</p>
              <select onChange={handleStatus}>
                <option>Todos</option>
                <option>activo</option>
                <option>mantenimiento</option>
              </select>
            </div>
          </div>
          <div className="filters-btn-combined">
            <div className="filters-row-sort">
              <button className={az ? "filter-activation" : ""} onClick={() => { setAZ(!az); setZA(false); }}>A-Z</button>
              <button className={za ? "filter-activation" : ""} onClick={() => { setZA(!za); setAZ(false); }}>Z-A</button>
            </div>
          </div>
        </div>
        <div className="software-cards">
          {filtered.map((el) => {
            return (
              <ServerCard
                key={el.id}
                id={el.id}
                name={el.name}
                ip={el.ip}
                location={el.location}
                os={el.os}
                status={el.status}
                numberOfNodes={el.numberOfNodes}
                hostedSoftware={el.hostedSoftware.map((hS) =>
                  software.find((s) => hS === s.id).name)}
                connectedUsers={el.connectedUsers}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ServersInvPage
