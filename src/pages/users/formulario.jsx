import { useState } from "react"

function RegistroForm() {
    const [formData, setFormData] = useState({
        nombre: "", email: "", password: "",
    })
    
    function handleChange(event) {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    return (
        <div className="form-container">
            <h2 className="form-title">Formulario de Registro</h2>
            <form>
                <div className="form-group">
                    <label>Nombre </label>
                    <input
                        type="text" 
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Escrbe tu nombre..."
                    />
                </div>

                <div className="form-group">
                    <label>Email </label>
                    <input
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="example@gmail.com"
                    />
                </div>

                <div className="form-group">
                    <label>Contraseña </label>
                    <input
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Escriba una contraseña..."
                    />
                </div>
            </form>
        </div>
    )
}

export default RegistroForm