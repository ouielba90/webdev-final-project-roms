import { useContext, useState } from "react";
import { DataContext } from "../../context/inventory/DataContext";
import SoftwareCard from "../../components/inventory/SoftwareCard";
import AddSoftware from "../../components/inventory/AddSoftware";
import EditSoftware from "../../components/inventory/EditSoftware.jsx"
import Modal from "../../components/inventory/Modal.jsx"
import { Outlet } from "react-router-dom";
import useFiltersSearch from "../../logic/inventory/useFiltersSearch.js";
import useSoftwareActions from "../../logic/inventory/useSoftwareActions.js";

function SoftwareInvPage() {
  const { software, setSoftware, softwareApi, hardware, servers } = useContext(DataContext);
  const { syncCreationWithHardwareAndServers, syncEditWithHardwareAndServers, syncRemoveWithHardwareAndServers } = useSoftwareActions();

  const { filtered, az, za, setAZ, setZA, handleSearch, handleStatus } = useFiltersSearch(software, "software");

  const hardwareById = Object.fromEntries(hardware.map(h => [h._id, h]));
  const serversById = Object.fromEntries(servers.map(s => [s._id, s]));

  // Forms
  const [addFormOpen, setAddFormOpen] = useState(false)
  const [editFormOpen, setEditFormOpen] = useState(false)
  const [currEditId, setCurrEditId] = useState(null)
  const [selectedHard, setSelectedHard] = useState([]);
  const [selectedServ, setSelectedServ] = useState([]);
  const categList = Array.from(new Set(software.map(el => el.category)))
  const hardList = hardware.map(el => { return { id: el._id, model: el.model } })
  const serverList = servers.map(el => { return { id: el._id, name: el.name } })

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const newItem = {
      name: data.name,
      version: data.version,
      category: data.category,
      status: data.status,
      licenseId: null,
      installedOnHardware: selectedHard,
      serverId: selectedServ, //Evita que se rompa si lo que devuelve data.serverId
      description: data.description,
    };
    const created = await softwareApi.createSoftware(newItem);
    if (!created) return;
    const normalized = { ...created, id: created._id || created.id };
    setSoftware(prev => [...prev, normalized]);

    await syncCreationWithHardwareAndServers(created._id, selectedHard, selectedServ);

    e.target.reset()
    setSelectedHard([])
    setSelectedServ([])
    setAddFormOpen(false)
  }

  function handleEdit(id) {
    setEditFormOpen(true)
    setCurrEditId(id)
  }

  async function handleSubmitEdit(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const updatedItem = {
      name: data.name,
      version: data.version,
      category: data.category,
      status: data.status,
      installedOnHardware: selectedHard,
      serverId: selectedServ, //Evita que se rompa si lo que devuelve data.serverId
      description: data.description,
    }

    const updated = await softwareApi.updateSoftware(currEditId, updatedItem)
    if (!updated) return;
    const normalized = { ...updated, id: updated._id || updated.id };
    setSoftware(prev =>
      prev.map(item =>
        item._id === currEditId ? normalized : item
      ))
    const prevItem = software.find(item => item._id === currEditId);
    await syncEditWithHardwareAndServers(currEditId, prevItem, updatedItem);
    setEditFormOpen(false)
  }

  async function handleRemove(id) {
    const userConfirmation = confirm(`¿Seguro que quieres proceder a eliminar el software cuya id es ${id}?`);
    if (userConfirmation) {
      const deleted = await softwareApi.deleteSoftware(id);
      if (!deleted) return;
      setSoftware(prev => prev.filter(el => el._id !== id))

      await syncRemoveWithHardwareAndServers(id);
    }

  }

  return (
    <>
      <Modal open={editFormOpen} onClose={() => setEditFormOpen(false)}>
        <EditSoftware
          toBeEdited={software.find(s => s._id === currEditId)}
          categList={categList}
          serverList={serverList}
          hardList={hardList}
          handleSubmitEdit={handleSubmitEdit}
          selectedHard={selectedHard}
          setSelectedHard={setSelectedHard}
          selectedServ={selectedServ}
          setSelectedServ={setSelectedServ}
          setEditFormOpen={setEditFormOpen}
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
          setAddFormOpen={setAddFormOpen}
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
                key={el._id}
                id={el._id}
                name={el.name}
                version={el.version}
                category={el.category}
                description={el.description}
                status={el.status}
                licenseId={el.licenseId}
                installedOnHardware={el.installedOnHardware.map(hid => hardwareById[hid]?.model).filter(Boolean)}
                serverId={el.serverId.map(sid => serversById[sid]?.name).filter(Boolean)}
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