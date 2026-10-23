const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
    {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true, index: true },

        academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear", required: true, index: true },

        classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true, index: true },

        name: { type: String, required: true, trim: true, uppercase: true, maxlength: 50 },

        code: { type: String, required: true, trim: true, maxlength: 30 },

        capacity: { type: Number, default: null },

        classTeacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },

        status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" }
    },
    {
        timestamps: true
    }
);
sectionSchema.index(
    { academicYearId: 1, classId: 1, code: 1 },
    { unique: true }
);

module.exports = mongoose.model("Section", sectionSchema);