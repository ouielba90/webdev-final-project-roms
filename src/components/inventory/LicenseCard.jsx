function LicenseCard({ id, softwareName, seats, purchaseDate, expiryDate, status, handleRemove }) {
  return (
    <div>
      <div>Software: {softwareName}</div>
      <div>Número máximo de usuarios autorizados: {seats}</div>
      <div>Fecha de compra: {purchaseDate}</div>
      <div>Fecha de expiración: {expiryDate}</div>
      <div>Estado: {status}</div>
      <div><button onClick={() => handleRemove(id)}>Delete</button></div>
      <hr />
    </div>
  )
}

export default LicenseCard
