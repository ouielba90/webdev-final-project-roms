import { useState } from "react";
import useLicensesValidation from "../../logic/inventory/useLicensesValidation.js"

function AddLicense({ softList, handleSubmit, selectedSoft, setSelectedSoft, setAddFormOpen }) {
  const [form, setForm] = useState({
    vendor: "",
    seats: "",
    licenseKey: "",
    purchaseDate: "",
    expiryDate: "",
    compareDates: "",
    cost: ""
  });

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
            <label htmlFor="software">Software</label>
            <select id="software" name="software"
              onChange={e =>
                setSelectedSoft(Array.from(e.target.selectedOptions, o => o.value))}>
              <option key="1234" value="">Selecciona software</option>
              {softList.map((software, i) => {
                return (
                  <option key={i} value={software.name}>{software.name}</option>
                )
              })}
            </select>
          </div>
          <div className="addsoft-group">
            <label htmlFor="vendor">Proveedor</label>
            <input type="text" id="vendor" name="vendor" onChange={handleChange} />
            {errors.vendor && <small className="error-msg">{errors.vendor}</small>}
          </div>
        </div>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="seats">Asignaciones</label>
            <input type="number" id="seats" name="seats" onChange={handleChange} />
            {errors.seats && <small className="error-msg">{errors.seats}</small>}
          </div>
          <div className="addsoft-group">
            <label htmlFor="licenseKey">Clave de licencia</label>
            <input type="text" id="licenseKey" name="licenseKey" onChange={handleChange} />
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
          </div>
        </div>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="cost">Precio (€)</label>
            <input type="number" id="cost" name="cost" onChange={handleChange} />
            {errors.cost && <small className="error-msg">{errors.cost}</small>}
          </div>
        </div>

        <div className="addsoft-row">
          <button className="addsoft-cancel" type="button" onClick={() => setAddFormOpen(false)}>Cancel</button>
          <button type="submit" className="addsoft-submit" disabled={!canSubmit}>Añadir</button>
        </div>
      </form>
    </>
  )
}

export default AddLicense
