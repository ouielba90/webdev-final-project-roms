import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import SoftwareCard from "../../components/inventory/SoftwareCard";
import AddSoftware from "../../components/inventory/AddSoftware";
import EditSoftware from "../../components/inventory/EditSoftware.jsx"
import Modal from "../../components/inventory/Modal.jsx"

function SoftwareInvPage() {
  const { software, hardware, servers } = useContext(DataContext);

  const [query, setQuery] = useState(software)
  const [search, setSearch] = useState("")
  const [az, setAZ] = useState(false)
  const [za, setZA] = useState(false)
  const [status, setStatus] = useState("")

  useEffect(() => {
    let filtered = software.filter(
      (el) => {
        const matchesSearch = el.name.toLowerCase().includes(search.toLowerCase()) ||
          el.description.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = status === "" || el.status === status

        return matchesSearch && matchesStatus
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
  }, [search, software, az, za, status]);

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

  function handleStatus(e) {
    setStatus(e.target.value)
  }

  function handleRemove(id) {
    setQuery(prev => prev.filter(el => el.id !== id))
  }

  const [addFormOpen, setAddFormOpen] = useState(false)
  const [editFormOpen, setEditFormOpen] = useState(false)
  const [currEditId, setCurrEditId] = useState(0)
  const [selectedHard, setSelectedHard] = useState([]);
  const [selectedServ, setSelectedServ] = useState([]);
  const hardList = Array.from(new Set(hardware.map(el => { return { id: el.id, model: el.model } })))
  const categList = Array.from(new Set(software.map(el => el.category)))
  const serverList = Array.from(new Set(servers.map(el => { return { id: el.id, name: el.name } })))

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log('handle', selectedHard)
    const newItem = {
      id: query.length ? query.at(-1).id + 1 : 1001,
      name: data.name,
      version: data.version,
      category: data.category,
      status: data.status,
      licenseId: null,
      installedOnHardware: selectedHard,
      serverId: selectedServ, //Evita que se rompa si lo que devuelve data.serverId
      description: data.description,
    };

    setQuery(prev => [...prev, newItem]);
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
    console.log('data from edit', data, selectedHard)
    setQuery(prev =>
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
          toBeEdited={query.find(s => s.id === currEditId)}
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
          query={query}
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
      <h1>Sofware</h1>
      <div className="software-main-container">
        <div className="software-filters">
          <input type="text" id="searchForm" onChange={handleSearch} />
          <button onClick={handleSortAZ}>A-Z</button>
          <button onClick={handleSortZA}>Z-A</button>
          <p>Status</p>
          <select onChange={handleStatus}>
            <option></option>
            <option>available</option>
            <option>in-use</option>
          </select>
        </div>
        <div className="software-add-wrapper">
          <button onClick={() => setAddFormOpen(!addFormOpen)}>Add software</button>
        </div>
        <div className="software-cards">
          {query.map((el) => {
            console.log("card", el.id, el.name, el.serverId)
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
                installedOnHardware={el.installedOnHardware.map(hard => {
                  // console.log(hardware.find(h => h.id === hard).model)
                  const v = hardware.find(h => Number(hard) === h.id)
                  return v ? v.model : undefined;
                })}
                serverId={el.serverId.map(serv => {
                  // console.log(hardware.find(h => h.id === hard).model)
                  const v = servers.find(s => Number(serv) === s.id)
                  return v ? v.name : undefined;
                })}
                handleRemove={handleRemove}
                handleEdit={handleEdit}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default SoftwareInvPage
