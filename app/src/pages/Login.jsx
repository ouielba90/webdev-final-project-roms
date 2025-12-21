import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();

    const apiUrl = import.meta.env.VITE_API_URL;

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al iniciar sesión');
            }

            login(data.token, data.username);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-container">
            <header className='main-home-page-header login-header'>
                <h1>CyberProject</h1>
                <h3>Consultoría Ciberseguridad</h3>
            </header>

            <div className="login-card">
                <h2>Panel de Acceso</h2>
                {error && <div className="error-message">{error}</div>}
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group-login">
                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-login">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Iniciando...' : 'Entrar'}
                    </button>
                </form>
            </div>

            <footer className='main-footer login-footer'>
                <p>© 2025 CyberProject. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Login;
