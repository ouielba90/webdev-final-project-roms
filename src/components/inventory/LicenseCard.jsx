function LicenseCard({ id, softwareName, seats, vendor, expiryDate, status, handleRemove, handleEdit }) {
  return (
    <>
      <div className="software-card">
        <div className="software-card-first-section">
          <div className="software-card-name">{softwareName}</div>
          <div className="software-card-status">{status}</div>
        </div>
        <div>{vendor}</div>
        <div className="software-card-third-section">
          <div>Licencias: {seats}</div>
          <div>Expiry date: {expiryDate}</div>
        </div>
        <div className="software-card-second-section">
          <div className="software-card-details-btn"><button>Ver detalles</button></div>
          <div className=""><button onClick={() => handleEdit(id)}>Edit</button></div>
          <div className="software-card-delete-btn"><button onClick={() => handleRemove(id)}>Delete</button></div>
        </div>
      </div>
    </>
  )
}

export default LicenseCard
