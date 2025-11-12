function SoftwareCard({ name, version, category, description, status, licenseId }) {
  return (
    <>
      <div>
        <div>Nombre: {name}</div>
        <div>Versión: {version}</div>
        <div>Categoría: {category}</div>
        <div>Descripción: {description}</div>
        <div>Estado: {status}</div>
        <div>Licencia: {licenseId}</div>
        <hr />
      </div>
    </>
  )
}

export default SoftwareCard
