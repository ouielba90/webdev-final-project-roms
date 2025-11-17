import { Link, Outlet } from "react-router-dom"
import { users } from "./../../data/users.js"
import UserCard from "./users/UserCard.jsx"
import { useState } from "react"
import RegistroForm from "./users/formulario.jsx"

function UserPage() {
  const [usersState, setUsersState] = useState(users)

  function onDeleteUser(id) {
    const copy = [...usersState]
        setUsersState(copy.filter((user) => {
          return user.id !== id
        }))
    }

  return (
    <>
      <div className="users-div">
        <RegistroForm/>
        <h1>Lista de usuarios</h1>
        <div className="usersContainer">
          {usersState.map((user) => {
            return (
              <UserCard user={user} 
              onDeleteUser={onDeleteUser}/>
            )
          })
          }
        </div>
      </div>
    </>
  )
}

export default UserPage
