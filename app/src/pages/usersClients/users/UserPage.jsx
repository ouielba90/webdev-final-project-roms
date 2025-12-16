import { Link, Outlet } from "react-router-dom"
import { users } from "./../../../../data/users.js"
import UserCard from "./UserCard.jsx"
import { useState, useEffect } from "react"
import RegistroForm from "./formulario.jsx"
import EditUserModal from "./EditUserModal.jsx"
import getUsers from "../../../logic/getUsers.js"

function UserPage() {
  const [usersState, setUsersState] = useState(users)
  const [editingUser, setEditingUser] = useState(null)

  const [users, setUsers] = useState([])

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

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users: ", error));
  }, []);

  return (
    <>
      <div className="users-clients-div">
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
