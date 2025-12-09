import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.MONGO_DB,
        });
        console.log("[OK] Se ha conectado correctamente a MongoDB");
    } catch (err) {
        console.error("[ERROR] Error de conexión a MongoDB: ", err);
        process.exit(1);
    }
};

export default connectDB;