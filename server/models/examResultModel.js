const mongoose = require("mongoose");

const examResultSchema = new mongoose.Schema(
    {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true, index: true },

        examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true, index: true },

        classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true, index: true },

        sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true, index: true },

        subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true, index: true },

        assessmentConfigurationId: { type: mongoose.Schema.Types.ObjectId, ref: "ExamAssessmentConfiguration", required: true, index: true },

        components: [
            {
                name: { type: String, required: true, trim: true, maxlength: 100 },

                obtainedMarks: { type: Number, min: 0, default: null },

                grade: { type: String, trim: true, maxlength: 20, default: null }
            }
        ],

        totalObtained: { type: Number, min: 0, default: null },

        percentage: { type: Number, min: 0, max: 100, default: null },

        grade: { type: String, trim: true, maxlength: 20, default: null },

        status: { type: String, required: true, enum: ["DRAFT", "SUBMITTED", "VERIFIED", "REJECTED"], default: "DRAFT" }
    },
    {
        timestamps: true
    }
);


examResultSchema.index(
    { studentId: 1, examId: 1, subjectId: 1 },
    { unique: true }
);

module.exports = mongoose.model("ExamResult", examResultSchema);