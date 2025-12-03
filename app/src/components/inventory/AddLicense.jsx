function AddLicense({ softList, handleSubmit, selectedSoft, setSelectedSoft, setAddFormOpen }) {
  return (
    <>
      <form className="addsoft-form" onSubmit={handleSubmit}>
        <h2 className="addsoft-title">Añadir Licencia</h2>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="software">Software</label>
            <select id="software" name="software" value={selectedSoft}
              onChange={e =>
                setSelectedSoft(Array.from(e.target.selectedOptions, o => o.value))}>
              {softList.map((software, i) => {
                return (
                  <option key={i} value={software.name}>{software.name}</option>
                )
              })}
            </select>
          </div>
          <div className="addsoft-group">
            <label htmlFor="vendor">Proveedor</label>
            <input type="text" id="vendor" name="vendor" />
          </div>
        </div>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="seats">Asignaciones</label>
            <input type="number" id="seats" name="seats" />
          </div>
          <div className="addsoft-group">
            <label htmlFor="licenseKey">Clave de licencia</label>
            <input type="text" id="licenseKey" name="licenseKey" />
          </div>
        </div>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="purchaseDate">Fecha de compra</label>
            <input type="date" id="purchaseDate" name="purchaseDate" defaultValue={new Date().toISOString().split("T")[0]} />

          </div>
          <div className="addsoft-group">
            <label htmlFor="expiryDate">Fecha de expiración:</label>
            <input type="date" id="expiryDate" name="expiryDate" />
          </div>
        </div>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="cost">Precio (€)</label>
            <input type="number" id="cost" name="cost" />
          </div>
        </div>

        <div className="addsoft-row">
          <button className="addsoft-cancel" type="button" onClick={() => setAddFormOpen(false)}>Cancel</button>
          <button type="submit" className="addsoft-submit">Añadir</button>
        </div>
      </form>
    </>
  )
}

export default AddLicense
