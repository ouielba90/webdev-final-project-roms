function SoftwareCard({ id, name, version, category, status, handleRemove, handleEdit }) {
  return (
    <>
      <div className="software-card">
        <div className="software-card-first-section">
          <div className="software-card-name">{name}</div>
          <div className="software-card-status">{status}</div>
        </div>
        <div>{category} · {version}</div>
        <div className="software-card-second-section">
          <div className="software-card-details-btn"><button>Ver detalles</button></div>
          <div className=""><button onClick={() => handleEdit(id)}>Edit</button></div>
          <div className="software-card-delete-btn"><button onClick={() => handleRemove(id)}>Delete</button></div>
        </div>
      </div>
    </>
  )
}

export default SoftwareCard
