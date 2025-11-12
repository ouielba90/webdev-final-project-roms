import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import HardwareCard from "../../components/inventory/HardwareCard";
import AddHardware from "../../components/inventory/AddHardware";

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
        const matchesType = type === "" || el.type === type
        const matchesStatus = status === "" || el.status === status

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
      purchaseDate: data.purchaseDate,
      specs: { cpu: data.cpu, ram: data.ram, storage: data.storage },
      installedSoftware: selectedSoft.map(soft_name => software.find(s => s.name === soft_name).id),
    };

    setQuery(prev => [...prev, newItem]);
    e.target.reset()
    //console.log(newItem);
    setAddFormOpen(false)
  }
  return (
    <>
      <h1>Hardware</h1>
      <button onClick={() => setAddFormOpen(!addFormOpen)}>Add hardware</button>
      {addFormOpen && (
        <AddHardware
          query={query}
          softList={softList}
          handleSubmit={handleSubmit}
          selectedSoft={selectedSoft}
          setSelectedSoft={setSelectedSoft}
        />
      )}
      <input type="text" id="searchForm" onChange={handleSearch} />
      <button onClick={handleSortAZ}>A-Z</button>
      <button onClick={handleSortZA}>Z-A</button>
      <p>State</p>
      <select onClick={handleType}>
        <option></option>
        <option>Laptop</option>
        <option>Desktop</option>
      </select>
      <p>Status</p>
      <select onClick={handleStatus}>
        <option></option>
        <option>operational</option>
        <option>maintenance</option>
      </select>
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
            installedSoftware={el.installedSoftware.map(soft_id => software.find(s => s.id === soft_id).name)}
            handleRemove={handleRemove}
          />
        )
      })}
    </>
  )
}

export default HardwareInvPage
