const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
    {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },

        classId: { type: String, required: true, trim: true },

        standard: { type: String, required: true, trim: true },

        academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear", required: true },

        maximumCapacity: { type: Number, required: true, min: 1 },

        status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Class", classSchema);