function HardwareCard({ id, type, model, status, purchaseDate, specs, installedSoftware, handleRemove }) {
  console.log(specs)
  return (
    <div>
      <div>Tipo: {type}</div>
      <div>Modelo: {model}</div>
      <div>Estado: {status}</div>
      <div>Fecha de compra:: {purchaseDate}</div>
      <div>Especificaciones: CPU - {specs.cpu} RAM - {specs.ram} Storage {specs.storage}</div>
      <div>Software instalado: {installedSoftware.join(", ")}</div>
      <div><button onClick={() => handleRemove(id)}>Delete</button></div>
      <hr />
    </div>
  )
}

export default HardwareCard
