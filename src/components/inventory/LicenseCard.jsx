function LicenseCard({ softwareIds, seats, purchaseDate, expiryDate, status, ownerId }) {
  return (
    <div>
      <div>Software: {softwareIds}</div>
      <div>Número máximo de usuarios autorizados: {seats}</div>
      <div>Fecha de compra: {purchaseDate}</div>
      <div>Fecha de expiración: {expiryDate}</div>
      <div>Estado: {status}</div>
      <div>Responsable: {ownerId}</div>
      <hr />
    </div>
  )
}

export default LicenseCard
