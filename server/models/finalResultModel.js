const mongoose = require("mongoose");

const finalResultSchema = new mongoose.Schema(
    {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true, index: true },

        academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear", required: true, index: true },

        classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true, index: true },

        sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true, index: true },

        policyId: { type: mongoose.Schema.Types.ObjectId, ref: "FinalResultPolicy", required: true, index: true },

        subjectResults: [
            {
                subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },

                subjectType: { type: String, required: true, enum: ["SCHOLASTIC", "CO_SCHOLASTIC"] },

                maxMarks: { type: Number, min: 0, default: null },

                obtainedMarks: { type: Number, min: 0, default: null },

                percentage: { type: Number, min: 0, max: 100, default: null },

                grade: { type: String, trim: true, maxlength: 20, default: null }
            }
        ],

        totalMarks: { type: Number, min: 0, default: null },

        totalObtained: { type: Number, min: 0, default: null },

        overallPercentage: { type: Number, min: 0, max: 100, default: null },

        overallGrade: { type: String, trim: true, maxlength: 20, default: null },

        remarks: { type: String, trim: true, maxlength: 500, default: null },

        resultStatus: { type: String, required: true, enum: ["PASS", "FAIL", "PROMOTED", "WITHHELD", "INCOMPLETE"] },

        status: { type: String, required: true, enum: ["CALCULATED", "VERIFIED", "PUBLISHED"], default: "CALCULATED" }
    },
    {
        timestamps: true
    }
);

finalResultSchema.index(
    { studentId: 1, academicYearId: 1 },
    { unique: true }
);

module.exports = mongoose.model("FinalResult", finalResultSchema);