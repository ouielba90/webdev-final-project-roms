import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/inventory/DataContext";
import LicenseCard from "../../components/inventory/LicenseCard";
import AddLicense from "../../components/inventory/AddLicense";
import EditLicense from "../../components/inventory/EditLicense";
import Modal from "../../components/inventory/Modal.jsx"
import { isoToeuDate, daysBetweenDates } from "./../../utils/inventory/date.js";
import useFiltersSearch from "../../logic/inventory/useFiltersSearch.js";
import useLicensesActions from "../../logic/inventory/useLicensesActions.js"

function LicensesInvPage() {
  let { licenses, setLicenses, licensesApi, software } = useContext(DataContext)
  const { syncCreationWithSoftware, syncEditWithSoftware, syncRemoveWithSoftware } = useLicensesActions();

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

  const [addFormOpen, setAddFormOpen] = useState(false)
  const [editFormOpen, setEditFormOpen] = useState(false)
  const [currEditId, setCurrEditId] = useState(0)
  const [selectedSoft, setSelectedSoft] = useState("");
  const [softList, setSoftList] = useState(
    software.filter(s => s.licenseId === null)
      .map(s => ({ _id: s._id, name: s.name })));

  console.log("softList, out", softList)
  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const newItem = {
      softwareId: software.find(s => s.name === data.software)._id,
      seats: data.seats,
      purchaseDate: data.purchaseDate,
      expiryDate: data.expiryDate,
      licenseKey: data.licenseKey,
      vendor: data.vendor,
      cost: data.cost,
    };
    const created = await licensesApi.createLicense(newItem);
    if (!created) return;
    const normalized = { ...created, id: created._id || created.id }

    setSoftList(prev => prev.filter((s) => s.name !== data.software))
    setLicenses(prev => [...prev, normalized]);

    await syncCreationWithSoftware(created._id, created.softwareId);
    e.target.reset()
    setAddFormOpen(false)
  }
  async function handleSubmitEdit(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("dataaa", data)
    const updatedItem = {
      _id: currEditId,
      softwareId: software.find(s => s.name === data.softwareId)._id,
      seats: data.seats,
      purchaseDate: data.purchaseDate,
      expiryDate: data.expiryDate,
      licenseKey: data.licenseKey,
      vendor: data.vendor,
      cost: data.cost,
      //softwareName: data.softwareId
    }
    const updated = await licensesApi.updateLicense(currEditId, updatedItem)
    if (!updated) return;
    const normalized = {
      ...updated,
      status: daysBetweenDates(data.expiryDate) > 0 ? "activa" : "expirada",
    };
    console.log("updated and normalized", updated, normalized)
    setLicenses(prev =>
      prev.map(item =>
        item._id === currEditId ? { ...item, ...normalized } : item
        // This is important because status and softwareName do not exist in the database
        // In Software and Hardware we don't need this
      ))
    const prevItem = licenses.find(item => item._id === currEditId);
    await syncEditWithSoftware(currEditId, prevItem, updatedItem);
    setEditFormOpen(false)
  }

  async function handleRemove(id) {
    const deleted = await licensesApi.deleteLicense(id);
    if (!deleted) return;
    setLicenses(prev => prev.filter(el => el._id !== id))
    await syncRemoveWithSoftware(id);
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
                softwareName={el.softwareId.name}
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
