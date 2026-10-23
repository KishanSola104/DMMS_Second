const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
    {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true, index: true },

        name: { type: String, required: true, trim: true, maxlength: 100 },

        code: { type: String, required: true, trim: true, maxlength: 30 },

        subjectType: { type: String, required: true, enum: ["SCHOLASTIC", "CO_SCHOLASTIC"] },

        description: { type: String, trim: true, maxlength: 500, default: null },

        isActive: { type: Boolean, required: true, default: true }
    },
    {
        timestamps: true
    }
);

subjectSchema.index(
    { schoolId: 1, code: 1 },
    { unique: true }
);

module.exports = mongoose.model("Subject", subjectSchema);