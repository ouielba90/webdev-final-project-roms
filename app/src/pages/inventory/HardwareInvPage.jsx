import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/inventory/DataContext";
import HardwareCard from "../../components/inventory/HardwareCard";
import AddHardware from "../../components/inventory/AddHardware";
import EditHardware from "../../components/inventory/EditHardware";
import Modal from "../../components/inventory/Modal.jsx"


function HardwareInvPage() {
  const { hardware, software } = useContext(DataContext)
  const [query, setQuery] = useState(hardware)
  const [search, setSearch] = useState("")
  const [az, setAZ] = useState(false)
  const [za, setZA] = useState(false)
  const [type, setType] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    let filtered = hardware.filter(
      (el) => {
        const matchesSearch = el.model.toLowerCase().includes(search.toLowerCase())
        const matchesType = type === "" || type === "Todos" || el.type === type
        const matchesStatus = status === "" || status === "Todos" || el.status === status

        return matchesSearch && matchesType && matchesStatus
      })

    if (az) {
      filtered = [...filtered].sort((a, b) =>
        a.model.toLowerCase().localeCompare(b.model.toLowerCase())
      );
    }
    if (za) {
      filtered = [...filtered].sort((a, b) =>
        b.model.toLowerCase().localeCompare(a.model.toLowerCase())
      );
    }

    setQuery(filtered);
  }, [search, hardware, az, za, type, status]);

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

  function handleType(e) {
    console.log(e.target.value)
    setType(e.target.value)
  }
  function handleStatus(e) {
    setStatus(e.target.value)
  }

  function handleRemove(id) {
    console.log(id)
    setQuery(prev => prev.filter(el => el.id !== id))
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
      id: query.length ? query.at(-1).id + 1 : 2001,
      type: data.type,
      model: data.model,
      status: data.status,
      purchaseDate: isoToeuDate(data.purchaseDate),
      specs: { cpu: data.cpu, ram: data.ram, storage: data.storage },
      installedSoftware: selectedSoft.map(soft_name => software.find(s => s.name === soft_name).id),
    };

    setQuery(prev => [...prev, newItem]);
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
    setQuery(prev =>
      prev.map(item =>
        item.id === Number(data.id) ? {
          ...item,
          type: data.type,
          model: data.model,
          status: data.status,
          purchaseDate: isoToeuDate(data.purchaseDate),
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
            toBeEdited={query.find(s => s.id === currEditId)}
            query={query}
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
            query={query}
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
              <button onClick={handleSortAZ}>A-Z</button>
              <button onClick={handleSortZA}>Z-A</button>
            </div>
            <div className="filters-row-sort">
              <button onClick={() => setAddFormOpen(!addFormOpen)}>Añadir hardware</button>
            </div>
          </div>
        </div>
        <div className="software-cards">
          {query.map((el) => {
            return (
              <HardwareCard
                key={el.id}
                id={el.id}
                type={el.type}
                model={el.model}
                status={el.status}
                purchaseDate={el.purchaseDate}
                specs={el.specs}
                installedSoftware={el.installedSoftware.map(soft_id => query.find(s => s.id === soft_id))}
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

function isoToeuDate(isoDateStr) {
  console.log('in1', isoDateStr)
  const [year, month, day] = isoDateStr.split("-"); // Month index begin with 0
  console.log(`${day}/${month}/${year}`)
  return `${day}/${month}/${year}`;
}
export default HardwareInvPage
