import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { DataContext } from "./../../context/inventory/DataContext"

function LicensesDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { software, licenses } = useContext(DataContext)
  const licenseItem = licenses.find(l => l.id === Number(id));
  console.log(licenseItem)
  const softAssoc = software.find(s => s.id === licenseItem.softwareId)

  if (!licenseItem) return <p>Licencia no encontrada.</p>;

  return (
    <>
      <div className="details-main">
        <div>
          <h3>License {licenseItem.id}</h3>
          <p><strong>{softAssoc.name}</strong></p>
          {daysBetweenDates(licenseItem.expiryDate) < 0 ? <p>Activo</p> : <p>Expirado</p>}
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
              <p>{licenseItem.purchaseDate}</p>
            </div>
            <div>
              <p><strong>Fecha de expiración</strong></p>
              <p>{licenseItem.expiryDate}</p>
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
      </div>
    </>
  )
}

function daysBetweenDates(euDateStr) {
  const [day, month, year] = euDateStr.split("/");
  const formattedDate = `${year}-${month}-${day}`;

  const givenDate = new Date(formattedDate);
  const today = new Date();

  const diffDays = Math.floor((today - givenDate) / (1000 * 60 * 60 * 24));

  return diffDays;
}
export default LicensesDetailsPage
