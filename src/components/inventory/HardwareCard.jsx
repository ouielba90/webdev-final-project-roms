function HardwareCard({ id, type, model, status, specs, handleRemove, handleEdit }) {
  return (
    <div className="software-card">
      <div className="software-card-first-section">
        <span className="software-card-name">{model}</span>
        <span className="software-card-status">{status}</span>
      </div>

      <div>
        <div>Tipo: {type}</div>
        <div>Especificaciones: CPU - {specs.cpu} RAM - {specs.ram} Storage - {specs.storage}</div>
      </div>

      <div className="software-card-second-section">
        <div className="software-card-details-btn"><button>Ver detalles</button></div>
        <div className=""><button onClick={() => handleEdit(id)}>Edit</button></div>
        <div className="software-card-delete-btn"><button onClick={() => handleRemove(id)}>Delete</button></div>
      </div>
    </div>
  );
}

export default HardwareCard
