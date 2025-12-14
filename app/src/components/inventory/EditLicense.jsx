import { useState } from "react"
import useHardwareValidation from "../../logic/inventory/useLicensesValidation"

function EditLicense({ toBeEdited, softList, handleSubmitEdit, setEditFormOpen }) {

  const [vendor, setVendor] = useState(toBeEdited.vendor)
  const [seats, setSeats] = useState(toBeEdited.seats)
  const [licenseKey, setLicenseKey] = useState(toBeEdited.licenseKey)
  const [purchaseDate, setPurchaseDate] = useState(toBeEdited.purchaseDate.split("T")[0])
  const [expiryDate, setExpiryDate] = useState(toBeEdited.expiryDate.split("T")[0])
  const [cost, setCost] = useState(toBeEdited.cost)
  const [softwareId, setSoftwareId] = useState(toBeEdited.softwareId)

  const { errors, canSubmit } = useHardwareValidation(
    vendor,
    seats,
    licenseKey,
    purchaseDate,
    expiryDate,
    cost
  );

  return (
    <>
      <form className="addsoft-form" onSubmit={handleSubmitEdit}>
        <h2 className="addsoft-title">Edit License</h2>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="_id">ID</label>
            <input type="text" id="_id" name="_id" value={toBeEdited._id} disabled />
          </div>
        </div>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="software">Software</label>
            <select id="softwareId" name="softwareId" value={softwareId}
              onChange={(e) => setSoftwareId(e.target.value)}>
              {softList.map((software) => {
                return (
                  <option key={software._id} value={software._id}>{software.name}</option>
                )
              })}
            </select>
          </div>
          <div className="addsoft-group">
            <label htmlFor="vendor">Proveedor</label>
            <input type="text" id="vendor" name="vendor" value={vendor} onChange={(e) => setVendor(e.target.value)} />
            {errors.vendor && <small className="error-msg">{errors.vendor}</small>}
          </div>
        </div>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="seats">Asignaciones</label>
            <input type="number" id="seats" name="seats" value={seats} onChange={(e) => setSeats(e.target.value)} />
            {errors.seats && <small className="error-msg">{errors.seats}</small>}
          </div>
          <div className="addsoft-group">
            <label htmlFor="licenseKey">Clave de licencia</label>
            <input type="text" id="licenseKey" name="licenseKey" value={licenseKey} onChange={(e) => setLicenseKey(e.target.value)} />
            {errors.licenseKey && <small className="error-msg">{errors.licenseKey}</small>}
          </div>
        </div>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="purchaseDate">Fecha de compra</label>
            <input
              type="date"
              id="purchaseDate"
              name="purchaseDate"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
            />
            {errors.purchaseDate && <small className="error-msg">{errors.purchaseDate}</small>}

          </div>
          <div className="addsoft-group">
            <label htmlFor="expiryDate">Fecha de expiración</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
            {errors.compareDates && <small className="error-msg">{errors.compareDates}</small>}
          </div>
        </div>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="cost">Precio (€)</label>
            <input type="number" id="cost" name="cost" value={cost} onChange={(e) => setCost(e.target.value)} />
            {errors.cost && <small className="error-msg">{errors.cost}</small>}
          </div>
        </div>

        <div className="addsoft-row">
          <button className="addsoft-cancel" type="button" onClick={() => setEditFormOpen(false)}>Cancel</button>
          <button type="submit" className="addsoft-submit" disabled={!canSubmit}>Aplicar cambios</button>
        </div>
      </form>
    </>
  )
}

export default EditLicense
