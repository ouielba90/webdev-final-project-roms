import { Link, Outlet } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import UserCard from "./UserCard.jsx"
import RegistroForm from "./formulario.jsx"
import EditUserModal from "./EditUserModal.jsx"
import { ApiDataContext } from "../../../context/ApiDataContext.js"

function UserPage() {
  const { users, setUsers, usersApi } = useContext(ApiDataContext)
  const [editingUser, setEditingUser] = useState()

  async function handleSubmit(e) {
    e.preventDefault()
    const datosFormulario = Object.fromEntries(new FormData(e.target).entries());
    console.log(datosFormulario)

    const newUser = {
      name: datosFormulario.name,
      id: datosFormulario.id,
      email: datosFormulario.email,
      role: datosFormulario.role,
      status: "activo"
    };
    setUsers(prev => [...prev, newUser])
    await usersApi.createData(newUser)
  }

  async function handleUpdate(e) {
    e.preventDefault()
    await usersApi.updateData(editingUser._id, editingUser)

    setUsers(users.map((user) => user._id === editingUser._id ? editingUser : user))
    setEditingUser(null)
  }

  async function onDeleteUser(_id) {
    const copy = [...users]
    setUsers(copy.filter((user) => {
      return user._id !== _id
    })) 
    await usersApi.deleteData(_id)
  }

  function onEditUser(user) {
    setEditingUser({ ...user })
  }

  return (
    <>
      <div className="users-clients-div">
        <RegistroForm handleSubmit={handleSubmit} />
        <h2 className="subtitle">Lista de usuarios</h2>
        <div className="usersContainer">
          {users.map(user => {
            return(
            <UserCard
              key={user._id}
              user={user}
              onDeleteUser={() => onDeleteUser(user._id)}
              onEditUser={() => onEditUser(user)}
            />
          )})}
        </div>

        <EditUserModal
          editingUser={editingUser}
          setEditingUser={setEditingUser}
          handleUpdate={handleUpdate}
        />
      </div>
    </>
  )
}

export default UserPage
