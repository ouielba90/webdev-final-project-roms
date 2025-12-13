import { useState } from "react"

function RegistroForm({handleSubmit}) {
    const [formData, setFormData] = useState({
        nombre: "", email: "", role: "",
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
            <h2 className="subtitle">Formulario de Registro</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre </label>
                    <input 
                        className="input-text"
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Escrbe tu nombre..."
                    />
                </div>

                <div className="form-group">
                    <label>Email </label>
                    <input 
                        className="input-text"
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="example@gmail.com"
                    />
                </div>

                <div className="form-group">
                    <label>Rol</label>
                    <select 
                        className="select-text"
                        type="selector" 
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        >
                        <option>Selecciona un rol</option>
                        <option>Manager</option>
                        <option>Cliente</option>
                        <option>Consultor/a</option>
                        <option>Otros</option>
                    </select>
                </div>

                <button className="login-btn" type="submit">Aceptar</button>
            </form>
        </div>
    )
}

export default RegistroForm