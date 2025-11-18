import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { DataContext } from "./../../context/DataContext"

function SoftwareDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { software } = useContext(DataContext)
  const softwareItem = software.find(s => s.id === Number(id));

  return (
    <>
      <div className="software-details-page">
        <h1>{softwareItem.name}</h1>
        <p>ID: {softwareItem.id}</p>
        <p>Version: {softwareItem.version}</p>
        <p>Category: {softwareItem.category}</p>
        <p>Status: {softwareItem.status}</p>
        <p>Description: {softwareItem.description}</p>
        <p>Installed on Hardware: {softwareItem.installedOnHardware.join(", ")}</p>
        <p>Server IDs: {softwareItem.serverId.join(", ")}</p>

        <button onClick={() => navigate("/inventory/software")}>
          Back to Software List
        </button>
      </div>
    </>
  )
}

export default SoftwareDetailsPage
