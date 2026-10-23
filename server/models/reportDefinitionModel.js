const mongoose = require("mongoose");

const reportDefinitionSchema = new mongoose.Schema(
    {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true, index: true },

        academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear", required: true, index: true },

        classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true, index: true },

        name: { type: String, required: true, trim: true, maxlength: 150 },

        code: { type: String, required: true, trim: true, uppercase: true, maxlength: 50 },

        reportType: { type: String, required: true, enum: ["ANNUAL_MARKSHEET", "EXAM_REPORT", "PROGRESS_REPORT"] },

        resultMode: { type: String, required: true, enum: ["FINAL_RESULT", "EXAM_WISE", "EXAM_AND_FINAL", "NO_RESULT"] },

        includedExamIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }],

        includeFinalResult: { type: Boolean, required: true, default: false },

        includeFinalAssessments: { type: Boolean, required: true, default: false },

        includeAttendance: { type: Boolean, required: true, default: false },

        includeRemarks: { type: Boolean, required: true, default: false },

        sections: [
            {
                code: { type: String, required: true, trim: true, uppercase: true, maxlength: 50 },

                title: { type: String, required: true, trim: true, maxlength: 100 },

                sectionType: { type: String, required: true, enum: ["STUDENT_INFO", "EXAM_RESULTS", "FINAL_RESULT", "ATTENDANCE", "REMARKS", "CO_CURRICULAR"] },

                displayOrder: { type: Number, required: true, min: 0, validate: { validator: Number.isInteger, message: "Display order must be an integer" } },

                isVisible: { type: Boolean, required: true, default: true }
            }
        ],

        templateId: { type: mongoose.Schema.Types.ObjectId, ref: "ReportTemplate", default: null },

        status: { type: String, required: true, enum: ["DRAFT", "ACTIVE", "INACTIVE", "ARCHIVED"], default: "DRAFT" }
    },
    {
        timestamps: true
    }
);

reportDefinitionSchema.index({ schoolId: 1, academicYearId: 1, classId: 1, code: 1 }, { unique: true });

reportDefinitionSchema.path("sections").validate(function (sections) {
    return sections.length > 0;
}, "At least one report section is required");

module.exports = mongoose.model("ReportDefinition", reportDefinitionSchema);
