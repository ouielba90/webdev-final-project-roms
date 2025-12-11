import mongoose from "mongoose";

const serversSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ip: { type: String, required: true },
    location: { type: String, required: true },
    os: { type: String, required: true },
    status: { type: String, required: true },
    numberOfNodes: { type: Number, required: true },
    nodeSpecs: [
        {
            nodeId: { type: String, required: true },
            cpu: { type: Number, required: true },
            ram: { type: String, required: true },
            storage: { type: String, required: true },
            cpuUsage: { type: Number, required: true },
            ramUsage: { type: Number, required: true },
            diskUsage: { type: Number, required: true }
        }
    ],
    hostedSoftware: [
        { type: mongoose.Schema.Types.ObjectId, ref: "SoftwarePost" }
    ],
    usersWithAccess: [{ type: String }],
    connectedUsers: { type: Number, required: true }
});

export default mongoose.model("ServersPost", serversSchema, "servers");