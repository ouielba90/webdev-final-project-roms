import { useEffect, useState } from "react"

function EditHardware({ toBeEdited, softList, handleSubmitEdit, selectedSoft, setSelectedSoft }) {
  const [type, setType] = useState(toBeEdited.type)
  const [model, setModel] = useState(toBeEdited.model)
  const [status, setStatus] = useState(toBeEdited.status)
  const [purchaseDate, setPurchaseDate] = useState(toBeEdited.purchaseDate)
  const [specsCPU, setSpecsCPU] = useState(toBeEdited.specs.cpu)
  const [specsRAM, setSpecsRAM] = useState(toBeEdited.specs.ram)
  const [specsStorage, setSpecsStorage] = useState(toBeEdited.specs.storage)

  console.log("raw purchaseDate:", purchaseDate, " type:", typeof purchaseDate, "len:", (purchaseDate || "").length);
  console.log("json:", JSON.stringify(purchaseDate));
  console.log("charCodes:", (purchaseDate || "").split("").map(c => c.charCodeAt(0)));
  console.log("new Date ->", new Date(purchaseDate), "isNaN:", isNaN(new Date(purchaseDate)));

  function handleSelectedSoftware(e) {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedSoft(selected)
  }

  useEffect(() => {
    setSelectedSoft(toBeEdited.installedSoftware)
  }, [toBeEdited, setSelectedSoft])

  function euToISO(euDateStr) {
    const [day, month, year] = euDateStr.split("/"); // Month index begin with 0
    console.log('kkkkkk', year, month, day)
    return `${year}-${month}-${day}`;
  }
  function isoToEU(isoDateStr) {
    const [year, month, day] = isoDateStr.split("-"); // Month index begin with 0
    return `${day}/${month}/${year}`;
  }
  return (
    <form onSubmit={handleSubmitEdit} className="addsoft-form">
      <h2 className="addsoft-title">Edit Hardware</h2>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="id">ID</label>
          <input type="text" id="id" name="id" value={toBeEdited.id} readOnly />
        </div>
      </div>
      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="type">Type</label>
          <select id="type" name="type" value={type} onChange={(e) => setType(e.target.value)}>
            <option>Desktop</option>
            <option>Laptop</option>
          </select>
        </div>
        <div className="addsoft-group">
          <label htmlFor="model">Model</label>
          <input type="text" id="model" name="model" value={model} onChange={(e) => setModel(e.target.value)} required />
        </div>
      </div>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Operational</option>
            <option>Maintenance</option>
          </select>
        </div>
        <div className="addsoft-group">
          <label htmlFor="purchaseDate">Purchase Date</label>
          <input
            type="date"
            id="purchaseDate"
            name="purchaseDate"
            value={euToISO(purchaseDate)}
            onChange={(e) => setPurchaseDate(isoToEU(e.target.value))}
          />
        </div>
      </div>

      <div className="addsoft-group">
        <label htmlFor="cpu">CPU</label>
        <input type="text" id="cpu" name="cpu" value={specsCPU} onChange={(e) => setSpecsCPU(e.target.value)} />
      </div>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="ram">RAM</label>
          <input type="text" id="ram" name="ram" value={specsRAM} onChange={(e) => setSpecsRAM(e.target.value)} />
        </div>
        <div className="addsoft-group">
          <label htmlFor="storage">Storage</label>
          <input type="text" id="storage" name="storage" value={specsStorage} onChange={(e) => setSpecsStorage(e.target.value)} />
        </div>
      </div>

      <div className="addsoft-group">
        <label htmlFor="installedSoftware">Installed Software</label>
        <select multiple id="installedSoftware" name="installedSoftware" value={selectedSoft} onChange={handleSelectedSoftware}>
          {softList.map((s, i) => (
            <option key={i} value={s.name}>{s.name}</option>
          ))}
        </select>
        <small className="hint">Hold CTRL to select multiple</small>
      </div>

      <button type="submit" className="addsoft-submit">Edit Hardware</button>
    </form>
  )
}

export default EditHardware
