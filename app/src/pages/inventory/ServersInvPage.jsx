import { useContext } from "react";
import { DataContext } from "../../context/inventory/DataContext";
import ServerCard from "../../components/inventory/ServerCard";
import useFiltersSearch from "../../hooks/inventory/useFiltersSearch";

function ServersInvPage() {
  const { servers, software } = useContext(DataContext)

  const { filtered, az, za, setAZ, setZA, handleSearch, handleStatus, handleOs } =
    useFiltersSearch(servers, "servers");

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
                key={el._id}
                id={el._id}
                name={el.name}
                ip={el.ip}
                location={el.location}
                os={el.os}
                status={el.status}
                numberOfNodes={el.numberOfNodes}
                hostedSoftware={el.hostedSoftware.map((hS) =>
                  software.find((s) => hS === s._id).name)}
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
