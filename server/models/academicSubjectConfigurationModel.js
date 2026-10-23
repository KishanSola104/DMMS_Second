const mongoose = require("mongoose");

const academicSubjectConfigurationSchema = new mongoose.Schema(
    {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true, index: true },

        academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear", required: true, index: true },

        classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true, index: true },

        subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true, index: true },

        evaluationType: { type: String, required: true, enum: ["MARKS", "GRADE"] },

        isCompulsory: { type: Boolean, required: true, default: true },

        isIncludedInFinalResult: { type: Boolean, required: true, default: true },

        status: { type: String, required: true, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" }
    },
    {
        timestamps: true
    }
);

academicSubjectConfigurationSchema.index(
    { academicYearId: 1, classId: 1, subjectId: 1 },
    { unique: true }
);

module.exports = mongoose.model("AcademicSubjectConfiguration", academicSubjectConfigurationSchema);