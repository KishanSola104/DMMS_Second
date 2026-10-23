const mongoose = require("mongoose");

const examAssessmentConfigurationSchema = new mongoose.Schema(
    {
        examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true, index: true },

        classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true, index: true },

        subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true, index: true },

        evaluationType: { type: String, required: true, enum: ["MARKS", "GRADE"] },

        components: [
            {
                name: { type: String, required: true, trim: true, maxlength: 100 },

                maxMarks: { type: Number, min: 0, default: null },

                gradeScaleId: { type: mongoose.Schema.Types.ObjectId, ref: "GradeScale", default: null },

                displayOrder: { type: Number, required: true, min: 0, validate: { validator: Number.isInteger, message: "Display order must be an integer" } }
            }
        ],

        totalMarks: { type: Number, min: 0, default: null },

        status: { type: String, required: true, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" }
    },
    {
        timestamps: true
    }
);


examAssessmentConfigurationSchema.index(
    { examId: 1, classId: 1, subjectId: 1 },
    { unique: true }
);

module.exports = mongoose.model("ExamAssessmentConfiguration", examAssessmentConfigurationSchema);