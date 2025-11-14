import { obtenerIniciales } from "./helpers"
import { obtenerEstilosPorRol } from "./themes"

function UserCard({ user }) {
    const { color, tema } = obtenerEstilosPorRol(user.role)
    return (
        <div className="userDiv" style={{ backgroundColor: color.background, border: `15px solid ${color.border}` }}>
            <div className="user-data">
                <p>
                    Nombre: {user.name} <br /> <br />
                    Rol: {user.role} <br /> <br />
                    Correo: {user.email}
                </p>
            </div>
            <div className="img-perfil" style={{ background: tema.background, border: ` 20px solid ${tema.border}`, color: tema.text }}>
                <span>{obtenerIniciales(user.name)}</span>
                
            </div>
        </div>
    )
}

export default UserCard