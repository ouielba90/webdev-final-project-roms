import { useEffect, useState } from "react"
import useHardwareValidation from "../../logic/inventory/useHardwareValidation";

function EditHardware({ toBeEdited, softList, handleSubmitEdit, selectedSoft, setSelectedSoft, setEditFormOpen }) {
  const [type, setType] = useState(toBeEdited.type)
  const [model, setModel] = useState(toBeEdited.model)
  const [status, setStatus] = useState(toBeEdited.status)
  const [purchaseDate, setPurchaseDate] = useState(toBeEdited.purchaseDate.split("T")[0])
  const [cpu, setCpu] = useState(toBeEdited.specs.cpu)
  const [ram, setRam] = useState(toBeEdited.specs.ram)
  const [storage, setStorage] = useState(toBeEdited.specs.storage)
  const [os, setOs] = useState(toBeEdited.os)
  const [lastMaintenance, setLastMaintenance] = useState(toBeEdited.lastMaintenance.split("T")[0])
  console.log("pffff", selectedSoft)
  function handleSelectedSoftware(e) {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedSoft(selected)
  }
  useEffect(() => {
    setSelectedSoft(toBeEdited.installedSoftware);
  }, [toBeEdited, setSelectedSoft]);

  const [form, setForm] = useState({
    model: toBeEdited.model,
    purchaseDate: toBeEdited.purchaseDate,
    lastMaintenance: toBeEdited.lastMaintenance,
    os: toBeEdited.os,
    cpu: toBeEdited.cpu,
    ram: toBeEdited.ram,
    storage: toBeEdited.storage
  });

  useEffect(() => {
    setForm({ model, purchaseDate, lastMaintenance, os, cpu, ram, storage });
  }, [model, purchaseDate, lastMaintenance, os, cpu, ram, storage]);

  const { errors, canSubmit } = useHardwareValidation(form);

  return (
    <form onSubmit={handleSubmitEdit} className="addsoft-form">
      <h2 className="addsoft-title">Editar Hardware</h2>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="id">ID</label>
          <input type="text" id="id" name="id" value={toBeEdited._id} disabled />
        </div>
      </div>
      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="type">Tipo</label>
          <select id="type" name="type" value={type} onChange={(e) => setType(e.target.value)}>
            <option>Sobremesa</option>
            <option>Portátil</option>
          </select>
        </div>
        <div className="addsoft-group">
          <label htmlFor="model">Modelo</label>
          <input type="text" id="model" name="model" value={model} onChange={(e) => setModel(e.target.value)} required />
          {errors.model && <small className="error-msg">{errors.model}</small>}
        </div>
      </div>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="status">Estado</label>
          <select id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
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
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
          {errors.purchaseDate && <small className="error-msg">{errors.purchaseDate}</small>}
        </div>
      </div>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="os">Sistema operativo</label>
          <input type="text" id="os" name="os" value={os} onChange={(e) => setOs(e.target.value)} />
          {errors.os && <small className="error-msg">{errors.os}</small>}
        </div>
        <div className="addsoft-group">
          <label htmlFor="cpu">CPU</label>
          <input type="text" id="cpu" name="cpu" value={cpu} onChange={(e) => setCpu(e.target.value)} />
          {errors.cpu && <small className="error-msg">{errors.cpu}</small>}
        </div>
      </div>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="ram">RAM</label>
          <input type="text" id="ram" name="ram" value={ram} onChange={(e) => setRam(e.target.value)} />
          {errors.ram && <small className="error-msg">{errors.ram}</small>}
        </div>
        <div className="addsoft-group">
          <label htmlFor="storage">Disco</label>
          <input type="text" id="storage" name="storage" value={storage} onChange={(e) => setStorage(e.target.value)} />
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
            value={lastMaintenance}
            onChange={(e) => setLastMaintenance(e.target.value)}
          />
          {errors.lastMaintenance && <small className="error-msg">{errors.lastMaintenance}</small>}
        </div>
      </div>
      <div className="addsoft-group">
        <label htmlFor="installedSoftware">Software instalado</label>
        <select multiple id="installedSoftware" name="installedSoftware" value={selectedSoft.map(h => h._id)} onChange={handleSelectedSoftware}>
          {softList.map((s, i) => (
            <option key={i} value={s.id}>{s.name}</option>
          ))}
        </select>
        <small className="hint">Mantén pulsado CTRL para seleccionar varios</small>
        {errors.compareDates && <small className="error-msg">{errors.compareDates}</small>}
      </div>

      <div className="addsoft-row">
        <button className="addsoft-cancel" type="button" onClick={() => setEditFormOpen(false)}>Cancel</button>
        <button type="submit" className="addsoft-submit" disabled={!canSubmit}>Aplicar cambios</button>
      </div>
    </form>
  )
}

export default EditHardware