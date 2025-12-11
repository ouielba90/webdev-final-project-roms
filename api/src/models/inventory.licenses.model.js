import mongoose from "mongoose";

const licensesSchema = new mongoose.Schema({
    softwareId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SoftwarePost",
        required: true
    },

    seats: { type: Number, required: true },

    purchaseDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },

    licenseKey: { type: String, required: true },

    vendor: { type: String, required: true },

    cost: { type: Number, required: true }
});

export default mongoose.model("LicensesPost", licensesSchema, "licenses");