import { Link, Outlet } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import { ApiDataContext } from "../../../context/ApiDataContext.js"
import ClientCard from "./ClientCard.jsx"
import getClients from "../../../logic/getClients.js"

function ClientPage() {
  // const [clientsState, setClientsState] = useState()
  const { users, setUsers, usersApi } = useContext(ApiDataContext)
  const clients = users.filter(user => user.role === "Cliente")
  
  async function onDeleteClient(id) {
    const copy = [...clients]
    setUsers(copy.filter((client) => {
      return client._id !== id
    }))
    console.log(id)
    await usersApi.deleteData(id)
  }
  return (
    <>
      <div className="users-clients-div">
        <h2 className="subtitle">Lista de clientes</h2>
        <div className="clientsContainer">
          {clients.map(client => {
            return(
            <ClientCard
              key={client.id}
              client={client}
              onDeleteClient={() => onDeleteClient(client._id)}
            />
          )})}
        </div>
      </div>
    </>
  )
}

export default ClientPage
