const mongoose = require("mongoose");

const finalResultPolicySchema = new mongoose.Schema(
    {
        academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear", required: true, index: true },

        classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true, index: true },

        name: { type: String, required: true, trim: true, maxlength: 150 },

        subjectRules: [
            {
                subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },

                operation: { type: String, required: true, enum: ["SUM", "AVERAGE", "SUM_DIVIDE"] },

                sourceExamIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true }],

                divisor: { type: Number, min: 0, default: null },

                includeFinalAssessments: { type: Boolean, required: true, default: false },

                finalAssessmentCodes: [{ type: String, trim: true, uppercase: true, maxlength: 50 }],

                displayOrder: { type: Number, required: true, min: 0, validate: { validator: Number.isInteger, message: "Display order must be an integer" } }
            }
        ],

        gradeScaleId: { type: mongoose.Schema.Types.ObjectId, ref: "GradeScale", default: null, index: true },

        status: { type: String, required: true, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" }
    },
    {
        timestamps: true
    }
);

finalResultPolicySchema.index(
    { academicYearId: 1, classId: 1 },
    { unique: true }
);

module.exports = mongoose.model("FinalResultPolicy", finalResultPolicySchema);