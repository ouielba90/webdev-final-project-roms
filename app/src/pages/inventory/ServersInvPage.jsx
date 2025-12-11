import { useContext } from "react";
import { DataContext } from "../../context/inventory/DataContext";
import ServerCard from "../../components/inventory/ServerCard";
import useFiltersSearch from "../../logic/inventory/useFiltersSearch";

function ServersInvPage() {
  const { servers } = useContext(DataContext)

  const { filtered, az, za, setAZ, setZA, handleSearch, handleStatus, handleOs } =
    useFiltersSearch(servers, "servers");

  const osList = [...new Set(servers.map(item => item.os.replace(/[0-9.]+/g, "").trim()))]

  return (
    <>
      <div className="software-main-container">
        <div className="filters-container">
          <div className="filters-row-main">
            <input type="text" id="searchForm" placeholder="Buscar servidor..." onChange={handleSearch} />
            <div className="filter-field">
              <p>S.O.</p>
              <select onClick={handleOs}>
                <option>Todos</option>
                {osList.map((os, i) => <option key={i}>{os}</option>)}
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
                key={el._id}
                id={el._id}
                name={el.name}
                ip={el.ip}
                location={el.location}
                os={el.os}
                status={el.status}
                numberOfNodes={el.numberOfNodes}
                hostedSoftware={el.hostedSoftware.map((hS) => hS.name)}
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
