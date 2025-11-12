import { obtenerIniciales } from "./helpers"
import { obtenerColorPorRol, temaPorRol } from "./themes"

function UserCard({ user }) {
    const tema = temaPorRol(user.role)
    const color = obtenerColorPorRol(user.role)

    return (
        <div 
        className="userDiv"
        style={{
            backgroundColor: tema.background,
            border: `20px solid ${tema.border}`,
            color: tema.text,
            borderRadius: '10px',
            borderTopLeftRadius: '150px',
            borderBottomLeftRadius: '150px',
        }} 
        key={user.id}>
            <div className="img-perfil" 
                style={{ 
                    backgroundColor: color.background,
                    border: `15px solid ${color.border}` }}>
                {obtenerIniciales(user.name)}
            </div>
            <div className="user-data user-name">
                <h2 className="title-dato">Nombre: {user.name} </h2>
                <h2 className="title-dato">Rol: {user.role}</h2>
                <h2 className="title-dato">Correo: {user.email}</h2>
            </div>
        </div>
    )
}

export default UserCard