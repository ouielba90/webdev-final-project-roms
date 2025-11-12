import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import SoftwareCard from "../../components/inventory/SoftwareCard";
import AddSoftware from "../../components/inventory/AddSoftware";

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
  const [selectedHard, setSelectedHard] = useState([]);
  //const [selectedServ, setSelectedServ] = useState([]);
  const hardList = Array.from(new Set(hardware.map(el => { return { id: el.id, model: el.model } })))
  const categList = Array.from(new Set(software.map(el => el.category)))
  const serverList = Array.from(new Set(servers.map(el => el.name)))

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const newItem = {
      id: query.length ? query.at(-1).id + 1 : 1001,
      name: data.name,
      version: data.version,
      category: data.category,
      status: data.status,
      licenseId: null,
      installedOnHardware: selectedHard,
      serverId: data.serverId,
      lastUpdated: data.lastUpdated,
      description: data.description,
    };

    setQuery(prev => [...prev, newItem]);
    e.target.reset()
    //console.log(newItem);
    setAddFormOpen(false)
  }


  return (
    <>
      <h1>Sofware</h1>
      <button onClick={() => setAddFormOpen(!addFormOpen)}>Add software</button>
      {addFormOpen && (
        <AddSoftware
          query={query}
          categList={categList}
          serverList={serverList}
          hardList={hardList}
          handleSubmit={handleSubmit}
          selectedHard={selectedHard}
          setSelectedHard={setSelectedHard}
        />
      )}

      <input type="text" id="searchForm" onChange={handleSearch} />
      <button onClick={handleSortAZ}>A-Z</button>
      <button onClick={handleSortZA}>Z-A</button>
      <p>Status</p>
      <select onChange={handleStatus}>
        <option></option>
        <option>available</option>
        <option>in-use</option>
      </select>
      {query.map((el) => {
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
          />
        )
      })}
    </>
  )
}

export default SoftwareInvPage
