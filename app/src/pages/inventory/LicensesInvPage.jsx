import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/inventory/DataContext";
import LicenseCard from "../../components/inventory/LicenseCard";
import AddLicense from "../../components/inventory/AddLicense";
import EditLicense from "../../components/inventory/EditLicense";
import Modal from "../../components/inventory/Modal.jsx"
import { isoToeuDate, daysBetweenDates } from "./../../utils/inventory/date.js";
import useFiltersSearch from "../../hooks/inventory/useFiltersSearch.js";

function LicensesInvPage() {
  let { licenses, setLicenses, software } = useContext(DataContext)

  useEffect(() => {
    setLicenses((prev) =>
      prev.map((lic) => {
        const sw = software.find((s) => s._id === lic.softwareId);
        const diff = daysBetweenDates(lic.expiryDate);
        return {
          ...lic,
          softwareName: sw ? sw.name : "Unknown",
          status: diff > 0 ? "activa" : "expirada",
        };
      })
    );
  }, [software]);

  const { filtered, az, za, setAZ, setZA, handleSearch, handleStatus } =
    useFiltersSearch(licenses, "licenses");

  function handleEdit(id) {
    setEditFormOpen(true)
    setCurrEditId(id)
  }

  function handleRemove(id) {
    setLicenses(prev => prev.filter(el => el.id !== id))
  }

  const [addFormOpen, setAddFormOpen] = useState(false)
  const [editFormOpen, setEditFormOpen] = useState(false)
  const [currEditId, setCurrEditId] = useState(0)
  const [selectedSoft, setSelectedSoft] = useState("");
  const softList = software.filter(s => s.licenseId === null)
    .map(s => ({ id: s._id, name: s.name }));

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const newItem = {
      id: licenses.length ? licenses.at(-1).id + 1 : 2001,
      softwareId: software.find(s => s.name === data.software).id,
      seats: data.seats,
      purchaseDate: isoToeuDate(data.purchaseDate),
      expiryDate: isoToeuDate(data.expiryDate),
      licenceKey: data.licenseKey,
      vendor: data.vendor,
      cost: data.cost,
    };

    setLicenses(prev => [...prev, newItem]);
    e.target.reset()
    setAddFormOpen(false)
  }
  function handleSubmitEdit(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    setLicenses(prev =>
      prev.map(item =>
        item.id === Number(data.id) ? {
          ...item,
          softwareId: software.find(s => s.name === data.softwareId).id,
          seats: data.seats,
          purchaseDate: data.purchaseDate,
          expiryDate: data.expiryDate,
          licenseKey: data.licenseKey,
          vendor: data.vendor,
          cost: data.cost,
        } : item));
    setEditFormOpen(false)
  }

  return (
    <>
      <Modal open={editFormOpen} onClose={() => setEditFormOpen(false)}>
        {editFormOpen && (
          <EditLicense
            toBeEdited={licenses.find(s => s._id === currEditId)}
            licenses={licenses}
            softList={softList}
            handleSubmitEdit={handleSubmitEdit}
            setEditFormOpen={setEditFormOpen}
          />
        )}
      </Modal>
      <Modal open={addFormOpen} onClose={() => setAddFormOpen(false)}>
        {addFormOpen && (
          <AddLicense
            licenses={licenses}
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
            <input type="text" id="searchForm" placeholder="Buscar licencia..." onChange={handleSearch} />
            <div className="filter-field">
              <p>Estado</p>
              <select onChange={handleStatus}>
                <option>Todos</option>
                <option>activa</option>
                <option>expirada</option>
              </select>
            </div>
          </div>
          <div className="filters-btn-combined">
            <div className="filters-row-sort">
              <button className={az ? "filter-activation" : ""} onClick={() => { setAZ(!az); setZA(false); }}>A-Z</button>
              <button className={za ? "filter-activation" : ""} onClick={() => { setZA(!za); setAZ(false); }}>Z-A</button>
            </div>
            <div className="filters-row-combined">
              <button onClick={() => setAddFormOpen(!addFormOpen)}>Añadir licencia</button>
            </div>
          </div>
        </div>
        <div className="software-cards">
          {filtered.map((el) => {
            return (
              <LicenseCard
                key={el._id}
                id={el._id}
                softwareName={software.find((s) => el.softwareId === s._id)?.name}
                seats={el.seats}
                purchaseDate={isoToeuDate(el.purchaseDate)}
                expiryDate={isoToeuDate(el.expiryDate)}
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

export default LicensesInvPage
