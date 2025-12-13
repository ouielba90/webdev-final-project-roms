import { Link, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"

import { clients } from "./../../../../data/clients.js"
import ClientCard from "./ClientCard.jsx"
import getClients from "../../../logic/getClients.js"

function ClientPage() {
  const [clientsState, setClientsState] = useState(clients)

  const [client, setClients] = useState([])

  function onDeleteClient(id) {
    const copy = [...clientsState]
    setClientsState(copy.filter((client) => {
      return client.id !== id
    }))
  }

  function onEditClient(client) {
    setEditingClient({ ...client })
  }

  useEffect(() => {
    getClients()
      .then((data) => setClients(data))
      .catch((error) => console.error("Error fetching clients: ", error));
  }, []);

  return (
    <>
      <div className="users-clients-div">
        <h2 className="subtitle">Lista de clientes</h2>
        <div className="clientsContainer">
          {clientsState.map(client => {
            return(
            <ClientCard
              key={client.id}
              client={client}
              onDeleteClient={() => onDeleteClient(client.id)}
            />
          )})}
        </div>
      </div>
    </>
  )
}

export default ClientPage
