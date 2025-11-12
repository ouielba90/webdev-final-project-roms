import { Link, Outlet } from "react-router-dom"
import { users } from "./../../data/users.js"
import UserCard from "./users/UserCard.jsx"

function UserPage() {
  console.log(users)
  return (
    <>
      <div>
        <h1>Lista de usuarios</h1>
        <div className="usersContainer">
          {users.map((user) => {
            return (
              <UserCard user={user} />
            )
          })
          }
        </div>
      </div>
    </>
  )
}

export default UserPage
