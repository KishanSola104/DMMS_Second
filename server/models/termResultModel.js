const mongoose = require("mongoose");

const termResultSchema = new mongoose.Schema(
    {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true, index: true },

        academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear", required: true, index: true },

        examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true, index: true },

        subjectResults: [
            {
                subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },

                subjectType: { type: String, required: true, enum: ["SCHOLASTIC", "CO_SCHOLASTIC"] },

                obtainedMarks: { type: Number, min: 0, default: null },

                maxMarks: { type: Number, min: 0, default: null },

                percentage: { type: Number, min: 0, max: 100, default: null },

                grade: { type: String, trim: true, maxlength: 20, default: null }
            }
        ],

        grandTotal: { type: Number, min: 0, default: null },

        percentage: { type: Number, min: 0, max: 100, default: null },

        grade: { type: String, trim: true, maxlength: 20, default: null },

        remarks: { type: String, trim: true, maxlength: 500, default: null },

        status: { type: String, required: true, enum: ["CALCULATED", "VERIFIED", "PUBLISHED"], default: "CALCULATED" }
    },
    { timestamps: true }
);


termResultSchema.index(
    { studentId: 1, academicYearId: 1, examId: 1 },
    { unique: true }
);

module.exports = mongoose.model("TermResult", termResultSchema);