import mongoose from "mongoose";

const hardwareSchema = new mongoose.Schema({
    type: { type: String, required: true },
    model: { type: String, required: true },
    status: { type: String, required: true },
    purchaseDate: { type: Date, required: true },
    specs: {
        cpu: { type: String, required: true },
        ram: { type: String, required: true },
        storage: { type: String, required: true },
    },
    assignedToUserId: { type: String, default: null },
    installedSoftware: [
        { type: mongoose.Schema.Types.ObjectId, ref: "SoftwarePost" }
    ],
    os: { type: String, required: true },
    lastMaintenance: { type: Date, required: true },
});

export default mongoose.model("HardwarePost", hardwareSchema, "hardware");