import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserCredentials from '../src/models/userCredentials.model.js';

dotenv.config({ path: '../.env' }); // Apunta al .env en la carpeta raíz de la API

const listUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.MONGO_DB,
        });
        console.log('Conectado a MongoDB');

        const users = await UserCredentials.find({}, { password: 0 });
        console.log('Usuarios en userCredentials:');
        console.log(users);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

listUsers();
