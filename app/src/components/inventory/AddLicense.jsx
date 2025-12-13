import { useState } from "react";
import useLicensesValidation from "../../logic/inventory/useLicensesValidation.js"

function AddLicense({ softList, handleSubmit, setAddFormOpen }) {
  const initialForm = {
    softwareId: "",
    vendor: "",
    seats: "",
    licenseKey: "",
    purchaseDate: "",
    expiryDate: "",
    compareDates: "",
    cost: ""
  };
  const [form, setForm] = useState(initialForm);
  const { errors, canSubmit } = useLicensesValidation(form);

  function handleChange(e) {
    setForm(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  }

  return (
    <>
      <form className="addsoft-form" onSubmit={handleSubmit}>
        <h2 className="addsoft-title">Añadir Licencia</h2>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="softwareId">Software</label>
            <select id="softwareId" name="softwareId"
              onChange={handleChange}>
              {softList.map((software) => {
                return (
                  <option key={software._id} value={software._id}>{software.name}</option>
                )
              })}
            </select>
          </div>
          <div className="addsoft-group">
            <label htmlFor="vendor">Proveedor</label>
            <input type="text" id="vendor" name="vendor" onChange={handleChange} placeholder="Ej: Microsoft" />
            {errors.vendor && <small className="error-msg">{errors.vendor}</small>}
          </div>
        </div>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="seats">Asignaciones</label>
            <input type="number" id="seats" name="seats" onChange={handleChange} placeholder="Ej: 10" />
            {errors.seats && <small className="error-msg">{errors.seats}</small>}
          </div>
          <div className="addsoft-group">
            <label htmlFor="licenseKey">Clave de licencia</label>
            <input type="text" id="licenseKey" name="licenseKey" onChange={handleChange} placeholder="Ej: ABCD-1234-EFGH-5678" />
            {errors.licenseKey && <small className="error-msg">{errors.licenseKey}</small>}
          </div>
        </div>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="purchaseDate">Fecha de compra</label>
            <input type="date" id="purchaseDate" name="purchaseDate" onChange={handleChange} />
            {errors.purchaseDate && <small className="error-msg">{errors.purchaseDate}</small>}

          </div>
          <div className="addsoft-group">
            <label htmlFor="expiryDate">Fecha de expiración</label>
            <input type="date" id="expiryDate" name="expiryDate" onChange={handleChange} />
            {errors.compareDates && <small className="error-msg">{errors.compareDates}</small>}
            {errors.expiryDate && <small className="error-msg">{errors.expiryDate}</small>}
          </div>
        </div>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="cost">Precio (€)</label>
            <input type="number" id="cost" name="cost" onChange={handleChange} placeholder="Ej: 299.99" />
            {errors.cost && <small className="error-msg">{errors.cost}</small>}
          </div>
        </div>

        <div className="addsoft-row">
          <button className="addsoft-cancel" type="button" onClick={() => {
            setAddFormOpen(false)
            setForm(initialForm)
          }}>Cancel</button>
          <button type="submit" className="addsoft-submit" disabled={!canSubmit}>Añadir</button>
        </div>
      </form>
    </>
  )
}

export default AddLicense
