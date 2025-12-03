function AddHardware({ softList, handleSubmit, selectedSoft, setSelectedSoft, setAddFormOpen }) {
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
          <input type="text" id="model" name="model" required />
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
          />
        </div>
      </div>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="os">Sistema operativo</label>
          <input type="text" id="os" name="os" />
        </div>
        <div className="addsoft-group">
          <label htmlFor="cpu">CPU</label>
          <input type="text" id="cpu" name="cpu" />
        </div>
      </div>

      <div className="addsoft-row">
        <div className="addsoft-group">
          <label htmlFor="ram">RAM</label>
          <input type="text" id="ram" name="ram" />
        </div>
        <div className="addsoft-group">
          <label htmlFor="storage">Disco</label>
          <input type="text" id="storage" name="storage" />
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
          />
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
      </div>

      <div className="addsoft-row">
        <button className="addsoft-cancel" type="button" onClick={() => setAddFormOpen(false)}>Cancel</button>
        <button type="submit" className="addsoft-submit">Añadir</button>
      </div>
    </form>
  )
}

export default AddHardware
