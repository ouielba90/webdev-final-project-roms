import { Link, Outlet } from "react-router-dom"
import { users } from "./../../data/users.js"
import UserCard from "./users/UserCard.jsx"
import { useState } from "react"
import RegistroForm from "./users/formulario.jsx"
import EditUserModal from "./users/EditUserModal.jsx"

function UserPage() {
  const [usersState, setUsersState] = useState(users)
  const [editingUser, setEditingUser] = useState(null)

  function handleSubmit(e) {
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
    setUsersState(prev => [...prev, newUser])
  }

  function handleUpdate(e) {
    e.preventDefault()
    setUsersState(
      usersState.map((user) =>
        user.id === editingUser.id ? editingUser : user)
    )
    setEditingUser(null)
  }

  function onDeleteUser(id) {
    const copy = [...usersState]
    setUsersState(copy.filter((user) => {
      return user.id !== id
    }))
  }

  function onEditUser(user) {
    setEditingUser({ ...user })
  }

  return (
    <>
      <div className="users-div">
        <RegistroForm handleSubmit={handleSubmit} />
        <h2 className="subtitle">Lista de usuarios</h2>
        <div className="usersContainer">
          {usersState.map(user => {
            return(
            <UserCard
              key={user.id}
              user={user}
              onDeleteUser={() => onDeleteUser(user.id)}
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
