import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserCredentials from '../src/models/userCredentials.model.js';
import SecurityState from '../src/models/securityState.model.js';

dotenv.config({ path: '../.env' }); // Apunta al .env en la carpeta raíz de la API

const unlockSecurity = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.MONGO_DB,
        });
        console.log('[OK] Conectado a MongoDB para desbloqueo');

        // 1. Desbloquear todas las cuentas de usuario específicas
        const userUpdate = await UserCredentials.updateMany(
            {},
            { $set: { loginAttempts: 0 }, $unset: { lockUntil: "" } }
        );
        console.log(`[OK] Usuarios desbloqueados: ${userUpdate.modifiedCount}`);

        // 2. Desbloquear el acceso global
        const securityUpdate = await SecurityState.updateOne(
            { key: 'global_auth' },
            { $set: { globalFailedAttempts: 0, globalLockUntil: null } }
        );
        console.log(`[OK] Bloqueo global reseteado: ${securityUpdate.modifiedCount}`);

        console.log('\n[INFO] El sistema de autenticación ha sido restablecido completamente.');
        process.exit(0);
    } catch (err) {
        console.error('[ERROR] No se pudo realizar el desbloqueo:', err);
        process.exit(1);
    }
};

unlockSecurity();
