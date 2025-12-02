import { useContext, useState } from "react";
import { DataContext } from "../../context/inventory/DataContext";
import SoftwareCard from "../../components/inventory/SoftwareCard";
import AddSoftware from "../../components/inventory/AddSoftware";
import EditSoftware from "../../components/inventory/EditSoftware.jsx"
import Modal from "../../components/inventory/Modal.jsx"
import { Outlet } from "react-router-dom";
import useFiltersSearch from "../../hooks/inventory/useFiltersSearch.js";

function SoftwareInvPage() {
  const { software, setSoftware, hardware, servers } = useContext(DataContext);

  const { filtered, az, za, setAZ, setZA, handleSearch, handleStatus } =
    useFiltersSearch(software, "software");

  const hardwareById = Object.fromEntries(hardware.map(h => [h.id, h]));
  const serversById = Object.fromEntries(servers.map(s => [s.id, s]));

  function handleRemove(id) {
    setSoftware(prev => prev.filter(el => el.id !== id))
  }

  // Forms
  const [addFormOpen, setAddFormOpen] = useState(false)
  const [editFormOpen, setEditFormOpen] = useState(false)
  const [currEditId, setCurrEditId] = useState(0)
  const [selectedHard, setSelectedHard] = useState([]);
  const [selectedServ, setSelectedServ] = useState([]);
  const categList = Array.from(new Set(software.map(el => el.category)))
  const hardList = hardware.map(el => { return { id: el.id, model: el.model } })
  const serverList = servers.map(el => { return { id: el.id, name: el.name } })

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const newItem = {
      id: software.length ? software.at(-1).id + 1 : 1001,
      name: data.name,
      version: data.version,
      category: data.category,
      status: data.status,
      licenseId: null,
      installedOnHardware: selectedHard,
      serverId: selectedServ, //Evita que se rompa si lo que devuelve data.serverId
      description: data.description,
    };

    setSoftware(prev => [...prev, newItem]);
    e.target.reset()
    setSelectedHard([])
    setSelectedServ([])
    setAddFormOpen(false)
  }

  function handleEdit(id) {
    setEditFormOpen(true)
    setCurrEditId(id)
  }

  function handleSubmitEdit(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    setSoftware(prev =>
      prev.map(item =>
        item.id === Number(data.id) ? {
          ...item,
          name: data.name,
          version: data.version,
          category: data.category,
          status: data.status,
          installedOnHardware: selectedHard,
          serverId: selectedServ, //Evita que se rompa si lo que devuelve data.serverId
          description: data.description,
        } : item));
    setEditFormOpen(false)
  }

  return (
    <>
      <Modal open={editFormOpen} onClose={() => setEditFormOpen(false)}>
        <EditSoftware
          toBeEdited={software.find(s => s.id === currEditId)}
          categList={categList}
          serverList={serverList}
          hardList={hardList}
          handleSubmitEdit={handleSubmitEdit}
          selectedHard={selectedHard}
          setSelectedHard={setSelectedHard}
          selectedServ={selectedServ}
          setSelectedServ={setSelectedServ}
        />
      </Modal>
      <Modal open={addFormOpen} onClose={() => setAddFormOpen(false)}>
        <AddSoftware
          software={software}
          categList={categList}
          serverList={serverList}
          hardList={hardList}
          handleSubmit={handleSubmit}
          selectedHard={selectedHard}
          setSelectedHard={setSelectedHard}
          selectedServ={selectedServ}
          setSelectedServ={setSelectedServ}
        />
      </Modal>
      <div className="software-main-container">
        <div className="filters-container">
          <div className="filters-row-main">
            <input type="text" id="searchForm" onChange={handleSearch} placeholder="Buscar software..." />
            <div className="filter-field">
              <p>Estado</p>
              <select onChange={handleStatus}>
                <option>Todos</option>
                <option>disponible</option>
                <option>en-uso</option>
              </select>
            </div>
          </div>
          <div className="filters-btn-combined">
            <div className="filters-row-sort">
              <button className={az ? "filter-activation" : ""} onClick={() => { setAZ(!az); setZA(false); }}>A-Z</button>
              <button className={za ? "filter-activation" : ""} onClick={() => { setZA(!za); setAZ(false); }}>Z-A</button>
            </div>
            <div className="filters-row-sort">
              <button onClick={() => setAddFormOpen(!addFormOpen)}>Añadir software</button>
            </div>
          </div>
        </div>
        <div className="software-cards">
          {filtered.map((el) => {
            return (
              <SoftwareCard
                key={el.id}
                id={el.id}
                name={el.name}
                version={el.version}
                category={el.category}
                description={el.description}
                status={el.status}
                licenseId={el.licenseId}
                installedOnHardware={el.installedOnHardware.map(hid => hardwareById[Number(hid)]?.model).filter(Boolean)}
                serverId={el.serverId.map(sid => serversById[Number(sid)]?.name).filter(Boolean)}
                handleRemove={handleRemove}
                handleEdit={handleEdit}
              />
            )
          })}
          <Outlet></Outlet>
        </div>
      </div>
    </>
  )
}

export default SoftwareInvPage
