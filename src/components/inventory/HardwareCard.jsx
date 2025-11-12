function HardwareCard({ type, model, location, status, purchaseDate }) {
  return (
    <div>
      <div>Tipo: {type}</div>
      <div>Modelo: {model}</div>
      <div>Ubicación: {location}</div>
      <div>Estado: {status}</div>
      <div>Fecha de compra:: {purchaseDate}</div>
      <hr />
    </div>
  )
}

export default HardwareCard
