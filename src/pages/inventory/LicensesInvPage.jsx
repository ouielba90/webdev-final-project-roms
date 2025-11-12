import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import LicenseCard from "../../components/inventory/LicenseCard";
import AddLicense from "../../components/inventory/AddLicense";

function LicensesInvPage() {
  let { licenses, software } = useContext(DataContext)
  // Link ID software-licenses
  licenses.forEach(lic => {
    const sw = software.find(s => s.id === lic.softwareId);
    lic.softwareName = sw ? sw.name : 'Unknown';
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

        const matchesStatus = status === "" || el.status === status

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
  const [selectedSoft, setSelectedSoft] = useState(0);
  const softList = Array.from(new Set(software.filter(el => {
    if (el.licenseId === null) {
      return { id: el.id, name: el.name }
    }
  })))

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data.software)
    const newItem = {
      id: query.length ? query.at(-1).id + 1 : 2001,
      softwareId: software.find(s => s.name === data.software).id,
      seats: data.seats,
      purchaseDate: data.purchaseDate,
      expiryDate: data.expiryDate,
    };

    setQuery(prev => [...prev, newItem]);
    e.target.reset()
    setAddFormOpen(false)
  }
  return (
    <>
      <h1>licenses</h1>
      <button onClick={() => setAddFormOpen(!addFormOpen)}>Add hardware</button>
      {addFormOpen && (
        <AddLicense
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
      <p>Status</p>
      <select onClick={handleStatus}>
        <option></option>
        <option>active</option>
        <option>expired</option>
      </select>
      {query.map((el) => {
        return (
          <LicenseCard
            key={el.id}
            id={el.id}
            softwareName={software.find((s) => el.softwareId === s.id)?.name}
            seats={el.seats}
            purchaseDate={el.purchaseDate}
            expiryDate={el.expiryDate}
            status={daysBetweenDates(el.expiryDate) < 0 ? "active" : "expired"}
            handleRemove={handleRemove}
          />
        )
      })}
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
export default LicensesInvPage
