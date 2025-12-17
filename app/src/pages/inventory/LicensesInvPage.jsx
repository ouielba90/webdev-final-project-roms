import { useContext, useEffect, useState } from "react";
import { ApiDataContext } from "../../context/ApiDataContext";
import LicenseCard from "../../components/inventory/LicenseCard";
import AddLicense from "../../components/inventory/AddLicense";
import EditLicense from "../../components/inventory/EditLicense";
import Modal from "../../components/inventory/Modal.jsx"
import { isoToeuDate, daysBetweenDates } from "./../../utils/inventory/date.js";
import useFiltersSearch from "../../logic/inventory/useFiltersSearch.js";
import useLicensesActions from "../../logic/inventory/useLicensesActions.js"

function LicensesInvPage() {
  let { licenses, setLicenses, licensesApi, software } = useContext(ApiDataContext)
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

  const [addFormOpen, setAddFormOpen] = useState(false)
  const [editFormOpen, setEditFormOpen] = useState(false)
  const [currEditId, setCurrEditId] = useState(0)
  const licenseToEdit = licenses.find(s => s._id === currEditId);

  const getSoftListForEdit = (license) => {
    if (!license) return [];

    return software
      .filter(s => s.licenseId === null || s._id === license.softwareId)
      .map(s => ({ _id: s._id, name: s.name }));
  };

  const softListForAdd = software
    .filter(s => s.licenseId === null)
    .map(s => ({ _id: s._id, name: s.name }));

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const newItem = {
      softwareId: data.softwareId,
      seats: data.seats,
      purchaseDate: data.purchaseDate,
      expiryDate: data.expiryDate,
      licenseKey: data.licenseKey,
      vendor: data.vendor,
      cost: data.cost,
    };
    const created = await licensesApi.createData(newItem);
    if (!created) return;

    setLicenses(prev => [...prev, created]);

    await syncCreationWithSoftware(created._id, created.softwareId);
    e.target.reset()
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

    const prevItem = licenses.find(item => item._id === currEditId);
    const updatedItem = {};

    // En este caso es necesario que softwareId esté presente en el item actualizado
    // para que se hagan las respectivas comparaciones durante la sincronización
    ["softwareId", "seats", "purchaseDate", "expiryDate", "licenseKey", "vendor", "cost"].forEach(key => {
      if (data[key] !== prevItem[key] || key === "softwareId") {
        updatedItem[key] = data[key];
      }
    });

    if (Object.keys(updatedItem).length === 0) {
      setEditFormOpen(false);
      return;
    }

    const updated = await licensesApi.updateData(currEditId, updatedItem);
    if (!updated) return;

    const normalized = {
      ...updatedItem,
      status: daysBetweenDates(data.expiryDate) > 0 ? "activa" : "expirada",
    };

    setLicenses(prev =>
      prev.map(item =>
        item._id === currEditId ? { ...item, ...normalized } : item
      )
    );
    await syncEditWithSoftware(currEditId, prevItem, updatedItem);

    setEditFormOpen(false);
  }

  // Estado para rastrear qué elemento se está eliminando
  const [idDeleting, setIdDeleting] = useState(null);

  async function handleRemove(id) {
    setIdDeleting(id);
    const userConfirmation = confirm(`¿Seguro que quieres proceder a eliminar la licencia cuya id es ${id}?`);
    if (userConfirmation) {
      const deleted = await licensesApi.deleteData(id);
      if (!deleted) return;
      setLicenses(prev => prev.filter(el => el._id !== id))
      await syncRemoveWithSoftware(id);
    }
    setIdDeleting(null);
  }

  return (
    <>
      <Modal open={editFormOpen} onClose={() => setEditFormOpen(false)}>
        {editFormOpen && (
          <EditLicense
            toBeEdited={licenses.find(s => s._id === currEditId)}
            licenses={licenses}
            softList={getSoftListForEdit(licenseToEdit)}
            handleSubmitEdit={handleSubmitEdit}
            setEditFormOpen={setEditFormOpen}
          />
        )}
      </Modal>
      <Modal open={addFormOpen} onClose={() => setAddFormOpen(false)}>
        {addFormOpen && (
          <AddLicense
            softList={softListForAdd}
            handleSubmit={handleSubmit}
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
                idDeleting={idDeleting}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default LicensesInvPage
