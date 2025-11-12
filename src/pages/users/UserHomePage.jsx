import './stylesMarc.css'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function UsersHomePage() {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <>
      <h1>Usuarios y clientes</h1>
      <div className='containerUsersHome'>
      {location.pathname === '/users' && (
        <>
        <div className="sections">
          <button onClick={() => {navigate('/users/usersList')}}><h1 className='sectUersTitles'>Usuarios</h1></button>
        </div>

        <div className='sections'>
            <button onClick={() => {navigate('/users/clientList')}}><h1 className='sectUersTitles'>Clientes</h1></button>
        </div>
        </>
      )
      
}
<Outlet></Outlet>
      </div>
    </>
  )
}

export default UsersHomePage
