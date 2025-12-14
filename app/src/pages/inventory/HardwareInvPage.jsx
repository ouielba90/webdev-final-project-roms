import { useContext, useState } from "react";
import { ApiDataContext } from "../../context/ApiDataContext";
import HardwareCard from "../../components/inventory/HardwareCard";
import AddHardware from "../../components/inventory/AddHardware";
import EditHardware from "../../components/inventory/EditHardware";
import Modal from "../../components/inventory/Modal.jsx"
import useFiltersSearch from "../../logic/inventory/useFiltersSearch.js";
import useHardwareActions from "../../logic/inventory/useHardwareActions.js";

function HardwareInvPage() {
  const { hardware, setHardware, hardwareApi, software } = useContext(ApiDataContext)
  const { syncCreationWithSoftware, syncEditWithSoftware, syncRemoveWithSoftware } = useHardwareActions();

  const { filtered, az, za, setAZ, setZA, handleSearch, handleStatus, handleType } =
    useFiltersSearch(hardware, "hardware");

  const [addFormOpen, setAddFormOpen] = useState(false)
  const [editFormOpen, setEditFormOpen] = useState(false)
  const [currEditId, setCurrEditId] = useState(0)
  const [selectedSoft, setSelectedSoft] = useState([]);
  const softList = software.map(el => { return { id: el._id, name: el.name } })

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const newItem = {
      type: data.type,
      model: data.model,
      status: data.status,
      purchaseDate: data.purchaseDate,
      specs: { cpu: data.cpu, ram: data.ram, storage: data.storage },
      installedSoftware: selectedSoft.map(soft_name => software.find(s => s.name === soft_name)._id),
      os: data.os,
      lastMaintenance: data.lastMaintenance
    };
    const created = await hardwareApi.createData(newItem);
    if (!created) return;
    const normalized = { ...created, id: created._id }
    setHardware(prev => [...prev, normalized]);

    await syncCreationWithSoftware(created._id, created.installedSoftware);

    e.target.reset()
    setSelectedSoft([]);
    setAddFormOpen(false)
  }

  function handleEdit(id) {
    setEditFormOpen(true)
    setCurrEditId(id)
  }

  async function handleSubmitEdit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const prevItem = hardware.find(item => item._id === currEditId);

    const updatedItem = {};

    ["type", "model", "status", "purchaseDate", "os", "lastMaintenance"].forEach(key => {
      if (data[key] !== prevItem[key]) {
        updatedItem[key] = data[key];
      }
    });

    const prevSpecs = prevItem.specs || {};
    const newSpecs = {};
    ["cpu", "ram", "storage"].forEach(key => {
      if (data[key] !== prevSpecs[key]) {
        newSpecs[key] = data[key];
      }
    });
    if (Object.keys(newSpecs).length > 0) {
      updatedItem.specs = { ...prevSpecs, ...newSpecs };
    }

    const prevSoftIds = prevItem.installedSoftware || [];
    const newSoftIds = selectedSoft.map(soft_name => software.find(s => s.name === soft_name)?._id).filter(Boolean);
    if (JSON.stringify(prevSoftIds) !== JSON.stringify(newSoftIds)) {
      updatedItem.installedSoftware = newSoftIds;
    }

    if (Object.keys(updatedItem).length === 0) {
      setEditFormOpen(false);
      return;
    }

    const updated = await hardwareApi.updateData(currEditId, updatedItem);
    if (!updated) return;

    setHardware(prev =>
      prev.map(item => item._id === currEditId ? { ...item, ...updatedItem } : item)
    );

    if (updatedItem.installedSoftware) {
      await syncEditWithSoftware(currEditId, prevItem, updatedItem);
    }

    setEditFormOpen(false);
  }

  async function handleRemove(id) {
    const userConfirmation = confirm(`¿Seguro que quieres proceder a eliminar el hardware cuya id es ${id}?`);
    if (userConfirmation) {
      const deleted = await hardwareApi.deleteData(id);
      if (!deleted) return;
      setHardware(prev => prev.filter(el => el._id !== id))

      await syncRemoveWithSoftware(id);
    }
  }

  return (
    <>
      <Modal open={editFormOpen} onClose={() => setEditFormOpen(false)}>
        {editFormOpen && (
          <EditHardware
            toBeEdited={hardware.find(s => s._id === currEditId)}
            hardware={hardware}
            softList={softList}
            handleSubmitEdit={handleSubmitEdit}
            selectedSoft={selectedSoft}
            setSelectedSoft={setSelectedSoft}
            setEditFormOpen={setEditFormOpen}
          />
        )}
      </Modal>
      <Modal open={addFormOpen} onClose={() => setAddFormOpen(false)}>
        {addFormOpen && (
          <AddHardware
            hardware={hardware}
            softList={softList}
            handleSubmit={handleSubmit}
            selectedSoft={selectedSoft}
            setSelectedSoft={setSelectedSoft}
            setAddFormOpen={setAddFormOpen}
          />
        )}
      </Modal>
      <div className="software-main-container">
        <div className="filters-container">
          <div className="filters-row-main">
            <input type="text" id="searchForm" onChange={handleSearch} placeholder="Buscar hardware..." />
            <div className="filter-field">
              <p>Tipo</p>
              <select onClick={handleType}>
                <option>Todos</option>
                <option>Portátil</option>
                <option>Sobremesa</option>
              </select>
            </div>
            <div className="filter-field">
              <p>Estado</p>
              <select onChange={handleStatus}>
                <option>Todos</option>
                <option>operativo</option>
                <option>mantenimiento</option>
              </select>
            </div>
          </div>
          <div className="filters-btn-combined">
            <div className="filters-row-sort">
              <button className={az ? "filter-activation" : ""} onClick={() => { setAZ(!az); setZA(false); }}>A-Z</button>
              <button className={za ? "filter-activation" : ""} onClick={() => { setZA(!za); setAZ(false); }}>Z-A</button>
            </div>
            <div className="filters-row-sort">
              <button onClick={() => setAddFormOpen(!addFormOpen)}>Añadir hardware</button>
            </div>
          </div>
        </div>
        <div className="software-cards">
          {filtered.map((el) => {
            return (
              <HardwareCard
                key={el._id}
                id={el._id}
                type={el.type}
                model={el.model}
                os={el.os}
                status={el.status}
                specs={el.specs}
                handleRemove={handleRemove}
                handleEdit={handleEdit}
              />
            )
          })}
        </div>
      </div >
    </>
  )
}

export default HardwareInvPage
