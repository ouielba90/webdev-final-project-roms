function AddHardware({ softList, handleSubmit, selectedSoft, setSelectedSoft }) {
  return (
    <form onSubmit={handleSubmit} className="addsoft-form">
      <h2 className="addsoft-title">Add Hardware</h2>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="type">Type</label>
          <select id="type" name="type">
            <option>Desktop</option>
            <option>Laptop</option>
          </select>
        </div>
        <div className="addsoft-group">
          <label htmlFor="model">Model</label>
          <input type="text" id="model" name="model" required />
        </div>
      </div>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status">
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
            defaultValue={new Date().toISOString().split("T")[0]}
          />
        </div>
      </div>

      <div className="addsoft-group">
        <label htmlFor="cpu">CPU</label>
        <input type="text" id="cpu" name="cpu" />
      </div>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="ram">RAM</label>
          <input type="number" id="ram" name="ram" />
        </div>
        <div className="addsoft-group">
          <label htmlFor="storage">Storage</label>
          <input type="number" id="storage" name="storage" />
        </div>
      </div>

      <div className="addsoft-group">
        <label htmlFor="installedSoftware">Installed Software</label>
        <select multiple id="installedSoftware" name="installedSoftware" value={selectedSoft} onChange={e => setSelectedSoft(Array.from(e.target.selectedOptions, o => o.value))}>
          {softList.map((s, i) => (
            <option key={i} value={s.name}>{s.name}</option>
          ))}
        </select>
        <small className="hint">Hold CTRL to select multiple</small>
      </div>

      <button type="submit" className="addsoft-submit">Add Hardware</button>
    </form>
  )
}

export default AddHardware
