const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, maxlength: 150 },

        code: { type: String, required: true, unique: true, trim: true, maxlength: 30 },

        address: {
            line1: { type: String, trim: true, maxlength: 200 },

            line2: { type: String, trim: true, maxlength: 200 },

            city: { type: String, trim: true, maxlength: 100 },

            state: { type: String, trim: true, maxlength: 100 },

            postalCode: { type: String, trim: true, maxlength: 20 },

            country: { type: String, trim: true, maxlength: 100 }
        },

        contact: {
            phone: { type: String, required: true, trim: true, maxlength: 20 },

            email: { type: String, required: true, trim: true, lowercase: true, maxlength: 150 },

            website: { type: String, trim: true, maxlength: 250, default: null }
        },

        contactPersons: [
            {
                name: { type: String, required: true, trim: true, maxlength: 200 },

                designation: { type: String, required: true, trim: true, maxlength: 200 },

                phone: { type: String, required: true, trim: true, maxlength: 20 },

                email: { type: String, required: true, trim: true, lowercase: true, maxlength: 150 }
            }
        ],

        logoUrl: { type: String, trim: true, maxlength: 500, default: null },

        status: { type: String, enum: ["Active", "Inactive"], default: "Active", required: true }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("School", schoolSchema);