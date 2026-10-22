const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
    {
        schoolId: { type: String, required: true, unique: true, trim: true, },

        schoolName: { type: String, required: true, trim: true },

        email: { type: String, required: true, unique: true, lowercase: true, trim: true },

        password: { type: String, required: true },

        phone: { type: String, required: true, trim: true },

        address: { type: String, required: true, trim: true },

        establishedYear: { type: Number, required: true },

        website: { type: String, default: null, trim: true },

        status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("School", schoolSchema);