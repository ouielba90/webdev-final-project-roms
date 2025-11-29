function AddLicense({ softList, handleSubmit, selectedSoft, setSelectedSoft }) {
  return (
    <>
      <form className="addsoft-form" onSubmit={handleSubmit}>
        <h2 className="addsoft-title">Add New License</h2>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="software">Software:</label>
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
            <label htmlFor="vendor">Vendor:</label>
            <input type="text" id="vendor" name="vendor" />
          </div>
        </div>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="seats">Seats:</label>
            <input type="number" id="seats" name="seats" />
          </div>
          <div className="addsoft-group">
            <label htmlFor="licenseKey">License key:</label>
            <input type="text" id="licenseKey" name="licenseKey" />
          </div>
        </div>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="purchaseDate">Purchase date:</label>
            <input type="date" id="purchaseDate" name="purchaseDate" defaultValue={new Date().toISOString().split("T")[0]} />

          </div>
          <div className="addsoft-group">
            <label htmlFor="expiryDate">Expiring date:</label>
            <input type="date" id="expiryDate" name="expiryDate" />
          </div>
        </div>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="cost">Cost:</label>
            <input type="number" id="cost" name="cost" />
          </div>
        </div>
        <button type="submit" className="addsoft-submit">Add License</button>
      </form>
    </>
  )
}

export default AddLicense
