import { Link, Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <h3>Menú principal</h3>
      <Link to='/'>Home</Link> |
      <Link to='/inventory'>Inventory</Link> |
      <Link to='/projects'>Projects</Link> |
      <Link to='/users'>Users</Link> |
      <Link to='/messages'>Messages</Link>
      <hr />
      <Outlet></Outlet>
    </>
  )
}

export default App
