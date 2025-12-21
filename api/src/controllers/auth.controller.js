import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserCredentials from '../models/userCredentials.model.js';
import SecurityState from '../models/securityState.model.js';

const LIMITS = { USER: 5, GLOBAL: 5 };
const LOCKS = { USER: 15 * 60 * 1000, GLOBAL: 10 * 60 * 1000 };
const MSG = {
    ERROR: 'Credenciales inválidas',
    BLOCK: (ms) => `Acceso bloqueado temporalmente por seguridad. Intente de nuevo en ${Math.ceil(ms / 60000)} minutos.`
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        let security = await SecurityState.findOne({ key: 'global_auth' }) || await SecurityState.create({ key: 'global_auth' });

        // 1. Bloqueo Global
        if (security.globalLockUntil > Date.now()) {
            return res.status(403).json({ message: MSG.BLOCK(security.globalLockUntil - Date.now()) });
        }

        const user = await UserCredentials.findOne({ username });

        // 2. Bloqueo de Usuario
        if (user?.lockUntil > Date.now()) {
            return res.status(403).json({ message: MSG.BLOCK(user.lockUntil - Date.now()) });
        }

        const isMatch = user && await bcrypt.compare(password, user.password);

        if (!isMatch) {
            // Manejar Fallo (Global y opcionalmente de Usuario)
            security.globalFailedAttempts = (security.globalFailedAttempts || 0) + 1;
            if (security.globalFailedAttempts >= LIMITS.GLOBAL) security.globalLockUntil = Date.now() + LOCKS.GLOBAL;
            await security.save();

            if (user) {
                user.loginAttempts = (user.loginAttempts || 0) + 1;
                if (user.loginAttempts >= LIMITS.USER) user.lockUntil = Date.now() + LOCKS.USER;
                await user.save();
            }

            console.log(`[AUTH] Fallo: ${username} | Global: ${security.globalFailedAttempts} | User: ${user?.loginAttempts || 0}`);
            return res.status(401).json({ message: MSG.ERROR });
        }

        // Éxito: Resetear todo
        user.loginAttempts = 0;
        user.lockUntil = undefined;
        await user.save();

        security.globalFailedAttempts = 0;
        security.globalLockUntil = null;
        await security.save();

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '0.5h' });
        res.json({ token, username: user.username });

    } catch (error) {
        console.error('Error login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export default { login };
