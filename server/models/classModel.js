const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
    {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true, index: true },

        name: { type: String, required: true, trim: true, maxlength: 100 },

        code: { type: String, required: true, trim: true, maxlength: 30 },

        subjects: [{
            type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true
        }],

        sequence: { type: Number, required: true },

        category: { type: String, enum: ["KINDERGARTEN", "PRIMARY", "UPPER_PRIMARY"], required: true },

        status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE", required: true }
    },
    {
        timestamps: true
    }
);

classSchema.index(
    { schoolId: 1, code: 1 },
    { unique: true }
);

module.exports = mongoose.model("Class", classSchema);