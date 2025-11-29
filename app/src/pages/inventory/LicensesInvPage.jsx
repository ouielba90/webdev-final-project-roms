import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/inventory/DataContext";
import LicenseCard from "../../components/inventory/LicenseCard";
import AddLicense from "../../components/inventory/AddLicense";
import EditLicense from "../../components/inventory/EditLicense";
import Modal from "../../components/inventory/Modal.jsx"

function LicensesInvPage() {
  let { licenses, software } = useContext(DataContext)
  licenses.forEach(lic => {
    const sw = software.find(s => s.id === lic.softwareId);
    lic.softwareName = sw ? sw.name : 'Unknown';
    const diff = daysBetweenDates(lic.expiryDate);
    lic.status = diff < 0 ? "activo" : "expirado";
  });

  const [query, setQuery] = useState(licenses)
  const [search, setSearch] = useState("")
  const [az, setAZ] = useState(false)
  const [za, setZA] = useState(false)
  const [status, setStatus] = useState("")


  useEffect(() => {
    let filtered = licenses.filter(
      (el) => {
        const softQueryName = software.find((s) => el.softwareName === s.name).name
        const matchesSearch = softQueryName.toLowerCase().includes(search.toLowerCase())

        const matchesStatus = status === "" || status === "Todos" || el.status === status

        return matchesSearch && matchesStatus
      })

    if (az) {
      filtered = [...filtered].sort((a, b) =>
        String(a.softwareName).toLowerCase().localeCompare(String(b.softwareName).toLowerCase())
      );
    }
    if (za) {
      filtered = [...filtered].sort((a, b) =>
        String(b.softwareName).toLowerCase().localeCompare(String(a.softwareName).toLowerCase())
      );
    }

    setQuery(filtered);
  }, [search, licenses, az, za, status, software]);

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
  const [selectedSoft, setSelectedSoft] = useState("");
  const softList = Array.from(new Set(software.filter(el => {
    if (el.licenseId === null) {
      return { id: el.id, name: el.name }
    }
  })))

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const newItem = {
      id: query.length ? query.at(-1).id + 1 : 2001,
      softwareId: software.find(s => s.name === data.software).id,
      seats: data.seats,
      purchaseDate: isoToeuDate(data.purchaseDate),
      expiryDate: isoToeuDate(data.expiryDate),
      licenceKey: data.licenseKey,
      vendor: data.vendor,
      cost: data.cost,
    };

    setQuery(prev => [...prev, newItem]);
    e.target.reset()
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
    console.log('data from edit', data, data.softwareId)
    console.log('sssssssss', isoToeuDate(data.expiryDate), isoToeuDate(data.purchaseDate))
    setQuery(prev =>
      prev.map(item =>
        item.id === Number(data.id) ? {
          ...item,
          softwareId: software.find(s => s.name === data.softwareId).id,
          seats: data.seats,
          purchaseDate: isoToeuDate(data.purchaseDate),
          expiryDate: isoToeuDate(data.expiryDate),
          licenseKey: data.licenseKey,
          vendor: data.vendor,
          cost: 3100,
        } : item));
    setEditFormOpen(false)
  }
  return (
    <>
      <Modal open={editFormOpen} onClose={() => setEditFormOpen(false)}>
        {editFormOpen && (
          <EditLicense
            toBeEdited={query.find(s => s.id === currEditId)}
            query={query}
            softList={softList}
            handleSubmitEdit={handleSubmitEdit}
          />
        )}
      </Modal>
      <Modal open={addFormOpen} onClose={() => setAddFormOpen(false)}>
        {addFormOpen && (
          <AddLicense
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
            <input type="text" id="searchForm" onChange={handleSearch} />
            <div className="filter-field">
              <p>Estado</p>
              <select onClick={handleStatus}>
                <option>Todos</option>
                <option>active</option>
                <option>expired</option>
              </select>
            </div>
          </div>
          <div className="filters-btn-combined">
            <div className="filters-row-sort">
              <button onClick={handleSortAZ}>A-Z</button>
              <button onClick={handleSortZA}>Z-A</button>
            </div>
            <div className="filters-row-combined">
              <button onClick={() => setAddFormOpen(!addFormOpen)}>Añadir license</button>
            </div>
          </div>
        </div>
        <div className="software-cards">
          {query.map((el) => {
            return (
              <LicenseCard
                key={el.id}
                id={el.id}
                softwareName={software.find((s) => el.softwareId === s.id)?.name}
                seats={el.seats}
                purchaseDate={el.purchaseDate}
                expiryDate={el.expiryDate}
                status={el.status}
                vendor={el.vendor}
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

function daysBetweenDates(euDateStr) {
  const [day, month, year] = euDateStr.split("/");
  const formattedDate = `${year}-${month}-${day}`;

  const givenDate = new Date(formattedDate);
  const today = new Date();

  const diffDays = Math.floor((today - givenDate) / (1000 * 60 * 60 * 24));

  return diffDays;
}
function isoToeuDate(isoDateStr) {
  console.log('in1', isoDateStr)
  const [year, month, day] = isoDateStr.split("-"); // Month index begin with 0
  console.log(`${day}/${month}/${year}`)
  return `${day}/${month}/${year}`;
}
export default LicensesInvPage
