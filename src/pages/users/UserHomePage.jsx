import './stylesMarc.css'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function UsersHomePage() {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <div className='users-list-body'>
      <h1>Usuarios y clientes</h1>
      <div className='containerUsersHome'>
      {location.pathname === '/users' && (
        <div>
        <div className="sections">
          <button onClick={() => {navigate('/users/usersList')}}><h1 className='sectUersTitles'>Usuarios</h1></button>
        </div>

        <div className='sections'>
            <button onClick={() => {navigate('/users/clientList')}}><h1 className='sectUersTitles'>Clientes</h1></button>
        </div>
        </div>
      )
      
}
<Outlet></Outlet>
      </div>
    </div>
  )
}

export default UsersHomePage
