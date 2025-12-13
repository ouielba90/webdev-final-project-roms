import mongoose from "mongoose";

const softwareSchema = new mongoose.Schema({
    name: { type: String, required: true },
    version: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, required: true },
    licenseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LicensesPost",
        default: null
    },
    installedOnHardware: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "HardwarePost"
        }
    ],
    serverId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ServersPost"
        }
    ],
    description: { type: String, required: true }
});

export default mongoose.model("SoftwarePost", softwareSchema, "software");