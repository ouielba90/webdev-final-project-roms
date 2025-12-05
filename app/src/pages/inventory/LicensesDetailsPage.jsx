import { useContext } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { DataContext } from "./../../context/inventory/DataContext"
import { isoToeuDate, daysBetweenDates } from "./../../utils/inventory/date.js";

function LicensesDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { software, licenses } = useContext(DataContext)
  const licenseItem = licenses.find(l => l.id === Number(id));
  if (!licenseItem) return <p>Licencia no encontrada.</p>;

  const softAssoc = software.find(s => s.id === licenseItem.softwareId)

  return (
    <>
      <div className="details-main">
        <div>

          <h2>License {licenseItem.id}</h2>
          <p><strong>Asociado a: </strong>
            <Link to={`/inventory/software/${softAssoc.id}`} className="details-links">
              {softAssoc.name}
            </Link></p>
          {daysBetweenDates(licenseItem.expiryDate) > 0 ?
            <p className="status activa">Activa</p>
            : <p className="status expirada">Expirada</p>}
        </div>

        <div>
          <h3>Resumen rápido</h3>
          <div className="details-quick-stats">
            <div>
              <p><strong>Asignación</strong></p>
              <p>{licenseItem.seats}</p>
            </div>
            <div>
              <p><strong>Fecha de compra</strong></p>
              <p>{isoToeuDate(licenseItem.purchaseDate)}</p>
            </div>
            <div>
              <p><strong>Fecha de expiración</strong></p>
              <p>{isoToeuDate(licenseItem.expiryDate)}</p>
            </div>
          </div>
        </div>

        <div>
          <h3>Otros detalles</h3>
          <div className="details-quick-stats">
            <div>
              <p><strong>Clave de licencia</strong></p>
              <p>{licenseItem.licenseKey}</p>
            </div>
            <div>
              <p><strong>Proveedor</strong></p>
              <p>{licenseItem.vendor}</p>
            </div>
            <div>
              <p><strong>Coste</strong></p>
              <p>{licenseItem.cost}€</p>
            </div>
          </div>
        </div>

        <button onClick={() => navigate("/inventory/licenses")}>
          Volver a la lista
        </button>
      </div >
    </>
  )
}

export default LicensesDetailsPage
