import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import ServerCard from "../../components/inventory/ServerCard";

function ServersInvPage() {
  const { servers, software } = useContext(DataContext)
  const [query, setQuery] = useState(servers)
  const [az, setAZ] = useState(false)
  const [za, setZA] = useState(false)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [os, setOs] = useState("")

  useEffect(() => {
    let filtered = servers.filter(
      (el) => {
        const matchesSearch = el.name.toLowerCase().includes(search.toLowerCase()) ||
          el.ip.includes(search)
        const marchesOs = os === "" || el.os.includes(os)
        const matchesStatus = status === "" || el.status === status

        return matchesSearch && marchesOs && matchesStatus
      })
    if (az) {
      filtered = [...filtered].sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    }
    if (za) {
      filtered = [...filtered].sort((a, b) =>
        b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      );
    }

    setQuery(filtered);
  }, [servers, os, search, status, az, za]);

  function handleSearch(e) {
    setSearch(e.target.value)
  }
  function handleSortAZ() {
    setAZ(!az)
    setZA(false)
  }

  function handleSortZA() {
    setZA(!za)
    setAZ(false)
  }
  function handleOS(e) {
    setOs(e.target.value)
  }
  function handleStatus(e) {
    setStatus(e.target.value)
  }
  return (
    <>
      <h1>Servers</h1>
      <div className="software-main-container">
        <div className="filters-container">
          <div className="filters-row-main">
            <input type="text" id="searchForm" onChange={handleSearch} />
            <div className="filter-field">
              <p>OS</p>
              <select onClick={handleOS}>
                <option></option>
                <option>CentOS</option>
                <option>Debian</option>
                <option>Rocky Linux</option>
                <option>Ubuntu</option>
              </select>
            </div>
            <div className="filter-field">
              <p>Status</p>
              <select onClick={handleStatus}>
                <option></option>
                <option>active</option>
                <option>maintenance</option>
              </select>
            </div>
          </div>
          <div className="filters-btn-combined">
            <div className="filters-row-sort">
              <button onClick={handleSortAZ}>A-Z</button>
              <button onClick={handleSortZA}>Z-A</button>
            </div>
          </div>
        </div>
        <div className="software-cards">
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
        </div>
      </div>
    </>
  )
}

export default ServersInvPage
