const mongoose = require("mongoose");

const finalAssessmentResultSchema = new mongoose.Schema(
    {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true, index: true },

        academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear", required: true, index: true },

        classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true, index: true },

        sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true, index: true },

        subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true, index: true },

        assessmentCode: { type: String, required: true, trim: true, uppercase: true, maxlength: 50 },

        assessmentName: { type: String, required: true, trim: true, maxlength: 100 },

        evaluationType: { type: String, required: true, enum: ["MARKS", "GRADE"] },

        maxMarks: { type: Number, min: 0, default: null },

        obtainedMarks: { type: Number, min: 0, default: null },

        grade: { type: String, trim: true, maxlength: 20, default: null },

        status: { type: String, required: true, enum: ["DRAFT", "SUBMITTED", "VERIFIED"], default: "DRAFT" }
    },
    {
        timestamps: true
    }
);


finalAssessmentResultSchema.index(
    { studentId: 1, academicYearId: 1, subjectId: 1, assessmentCode: 1 },
    { unique: true }
);

module.exports = mongoose.model("FinalAssessmentResult", finalAssessmentResultSchema);