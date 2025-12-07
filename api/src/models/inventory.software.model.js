import mongoose from "mongoose";

const softwareSchema = new mongoose.Schema({
    name: { type: String, required: true },
    version: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, required: true },
    licenseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "licensesPost",
        default: null
    },
    installedOnHardware: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "hardwarePost"
        }
    ],
    serverId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "serversPost"
        }
    ],
    description: { type: String, required: true }
});

export default mongoose.model("SoftwarePost", softwareSchema, "software");