import { useContext, useState } from "react";
import { DataContext } from "../../context/inventory/DataContext";
import HardwareCard from "../../components/inventory/HardwareCard";
import AddHardware from "../../components/inventory/AddHardware";
import EditHardware from "../../components/inventory/EditHardware";
import Modal from "../../components/inventory/Modal.jsx"


function HardwareInvPage() {
  const { hardware, setHardware, software } = useContext(DataContext)
  const [search, setSearch] = useState("")
  const [az, setAZ] = useState(false)
  const [za, setZA] = useState(false)
  const [type, setType] = useState("")
  const [status, setStatus] = useState("")

  let filtered = hardware.filter(
    (el) => {
      const matchesSearch = el.model.toLowerCase().includes(search.toLowerCase())
      const matchesType = type === "" || type === "Todos" || el.type === type
      const matchesStatus = status === "" || status === "Todos" || el.status === status

      return matchesSearch && matchesType && matchesStatus
    })
    .sort((a, b) => {
      if (az) return a.model.toLowerCase().localeCompare(b.model.toLowerCase());
      if (za) return b.model.toLowerCase().localeCompare(a.model.toLowerCase());
      return 0;
    })


  function handleSearch(e) {
    setSearch(e.target.value)
  }

  function handleType(e) {
    console.log(e.target.value)
    setType(e.target.value)
  }
  function handleStatus(e) {
    setStatus(e.target.value)
  }

  function handleRemove(id) {
    console.log(id)
    setHardware(prev => prev.filter(el => el.id !== id))
  }

  const [addFormOpen, setAddFormOpen] = useState(false)
  const [editFormOpen, setEditFormOpen] = useState(false)
  const [currEditId, setCurrEditId] = useState(0)
  const [selectedSoft, setSelectedSoft] = useState([]);
  const softList = Array.from(new Set(software.map(el => { return { id: el.id, name: el.name } })))

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const newItem = {
      id: hardware.length ? hardware.at(-1).id + 1 : 2001,
      type: data.type,
      model: data.model,
      status: data.status,
      purchaseDate: data.purchaseDate,
      specs: { cpu: data.cpu, ram: data.ram, storage: data.storage },
      installedSoftware: selectedSoft.map(soft_name => software.find(s => s.name === soft_name).id),
    };

    setHardware(prev => [...prev, newItem]);
    e.target.reset()
    setSelectedSoft([]);
    setAddFormOpen(false)
  }

  function handleEdit(id) {
    setEditFormOpen(true)
    console.log("id", id)
    setCurrEditId(id)
  }

  function handleSubmitEdit(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    //console.log('data from edit', data)
    setHardware(prev =>
      prev.map(item =>
        item.id === Number(data.id) ? {
          ...item,
          type: data.type,
          model: data.model,
          status: data.status,
          purchaseDate: data.purchaseDate,
          specs: { cpu: data.cpu, ram: data.ram, storage: data.storage },
          installedSoftware: selectedSoft,
        } : item));
    setEditFormOpen(false)
  }
  return (
    <>
      <Modal open={editFormOpen} onClose={() => setEditFormOpen(false)}>
        {editFormOpen && (
          <EditHardware
            toBeEdited={hardware.find(s => s.id === currEditId)}
            hardware={hardware}
            softList={softList}
            handleSubmitEdit={handleSubmitEdit}
            selectedSoft={selectedSoft}
            setSelectedSoft={setSelectedSoft}
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
              <select onClick={handleStatus}>
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
                key={el.id}
                id={el.id}
                type={el.type}
                model={el.model}
                status={el.status}
                purchaseDate={el.purchaseDate}
                specs={el.specs}
                installedSoftware={el.installedSoftware.map(soft_id => hardware.find(s => s.id === soft_id))}
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
