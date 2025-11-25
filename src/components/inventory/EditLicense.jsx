import { useState } from "react"

function EditLicense({ toBeEdited, softList, handleSubmitEdit }) {

  const [vendor, setVendor] = useState(toBeEdited.vendor)
  const [seats, setSeats] = useState(toBeEdited.seats)
  const [licenseKey, setLicenseKey] = useState(toBeEdited.licenseKey)
  const [purchaseDate, setPurchaseDate] = useState(toBeEdited.purchaseDate)
  const [expiryDate, setExpiryDate] = useState(toBeEdited.expiryDate)
  const [cost, setCost] = useState(toBeEdited.cost)
  const [softwareId, setSoftwareId] = useState(toBeEdited.softwareId)

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
    <>
      <form className="addsoft-form" onSubmit={handleSubmitEdit}>
        <h2 className="addsoft-title">Edit License</h2>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="id">ID</label>
            <input type="text" id="id" name="id" value={toBeEdited.id} readOnly />
          </div>
        </div>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="software">Software:</label>
            <select id="softwareId" name="softwareId" value={softwareId}
              onChange={(e) => setSoftwareId(e.target.value)}>
              {softList.map((software, i) => {
                return (
                  <option key={i} value={software.name}>{software.name}</option>
                )
              })}
            </select>
          </div>
          <div className="addsoft-group">
            <label htmlFor="vendor">Vendor:</label>
            <input type="text" id="vendor" name="vendor" value={vendor} onChange={(e) => setVendor(e.target.value)} />
          </div>
        </div>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="seats">Seats:</label>
            <input type="number" id="seats" name="seats" value={seats} onChange={(e) => setSeats(e.target.value)} />
          </div>
          <div className="addsoft-group">
            <label htmlFor="licenseKey">License key:</label>
            <input type="text" id="licenseKey" name="licenseKey" value={licenseKey} onChange={(e) => setLicenseKey(e.target.value)} />
          </div>
        </div>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="purchaseDate">Purchase date:</label>
            <input
              type="date"
              id="purchaseDate"
              name="purchaseDate"
              value={euToISO(purchaseDate)}
              onChange={(e) => setPurchaseDate(isoToEU(e.target.value))}
            />

          </div>
          <div className="addsoft-group">
            <label htmlFor="expiryDate">Expiring date:</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={euToISO(expiryDate)}
              onChange={(e) => setExpiryDate(isoToEU(e.target.value))}
            />
          </div>
        </div>
        <div className="addsoft-row">
          <div className="addsoft-group">
            <label htmlFor="cost">Cost:</label>
            <input type="number" id="cost" name="cost" value={cost} onChange={(e) => setCost(e.target.value)} />
          </div>
        </div>
        <button type="submit" className="addsoft-submit">Edit</button>
      </form>
    </>
  )
}

export default EditLicense
