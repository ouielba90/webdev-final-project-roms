import { useState } from "react";
import useHardwareValidation from "../../hooks/inventory/useHardwareValidation";

function AddHardware({ softList, handleSubmit, selectedSoft, setSelectedSoft, setAddFormOpen }) {
  const [form, setForm] = useState({
    model: "",
    purchaseDate: "",
    lastMaintenance: new Date().toISOString().split("T")[0],
    os: "",
    cpu: "",
    ram: "",
    storage: ""
  });

  const { errors, canSubmit } = useHardwareValidation(form);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };
  return (
    <form onSubmit={handleSubmit} className="addsoft-form">
      <h2 className="addsoft-title">Añadir Hardware</h2>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="type">Tipo</label>
          <select id="type" name="type">
            <option>Sobremesa</option>
            <option>Portátil</option>
          </select>
        </div>
        <div className="addsoft-group">
          <label htmlFor="model">Modelo</label>
          <input type="text" id="model" name="model" onChange={handleChange} required />
          {errors.model && <small className="error-msg">{errors.model}</small>}
        </div>
      </div>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="status">Estado</label>
          <select id="status" name="status">
            <option value={"operativo"}>Operativo</option>
            <option value={"mantenimiento"}>Mantenimiento</option>
          </select>
        </div>
        <div className="addsoft-group">
          <label htmlFor="purchaseDate">Fecha de compra</label>
          <input
            type="date"
            id="purchaseDate"
            name="purchaseDate"
            onChange={handleChange}
          />
          {errors.purchaseDate && <small className="error-msg">{errors.purchaseDate}</small>}
        </div>
      </div>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="os">Sistema operativo</label>
          <input type="text" id="os" name="os" onChange={handleChange} />
          {errors.os && <small className="error-msg">{errors.os}</small>}
        </div>
        <div className="addsoft-group">
          <label htmlFor="cpu">CPU</label>
          <input type="text" id="cpu" name="cpu" onChange={handleChange} />
          {errors.cpu && <small className="error-msg">{errors.cpu}</small>}
        </div>
      </div>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="ram">RAM</label>
          <input type="text" id="ram" name="ram" onChange={handleChange} />
          {errors.ram && <small className="error-msg">{errors.ram}</small>}
        </div>
        <div className="addsoft-group">
          <label htmlFor="storage">Disco</label>
          <input type="text" id="storage" name="storage" onChange={handleChange} />
          {errors.storage && <small className="error-msg">{errors.storage}</small>}
        </div>
      </div>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="lastMaintenance">Último mantenimiento</label>
          <input
            type="date"
            id="lastMaintenance"
            name="lastMaintenance"
            defaultValue={new Date().toISOString().split("T")[0]}
            onChange={handleChange}
          />
          {errors.lastMaintenance && <small className="error-msg">{errors.lastMaintenance}</small>}
        </div>
      </div>
      <div className="addsoft-group">
        <label htmlFor="installedSoftware">Software instalado</label>
        <select multiple id="installedSoftware" name="installedSoftware" value={selectedSoft} onChange={e => setSelectedSoft(Array.from(e.target.selectedOptions, o => o.value))}>
          {softList.map((s, i) => (
            <option key={i} value={s.name}>{s.name}</option>
          ))}
        </select>
        <small className="hint">Mantén pulsado CTRL para seleccionar varios</small>
        {errors.compareDates && <small className="error-msg">{errors.compareDates}</small>}
      </div>

      <div className="addsoft-row">
        <button className="addsoft-cancel" type="button" onClick={() => setAddFormOpen(false)}>Cancel</button>
        <button type="submit" className="addsoft-submit" disabled={!canSubmit}>Añadir</button>
      </div>
    </form>
  )
}

export default AddHardware
