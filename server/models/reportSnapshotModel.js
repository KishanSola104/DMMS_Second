const mongoose = require("mongoose");

const reportSnapshotSchema = new mongoose.Schema(
    {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true, index: true },

        academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear", required: true, index: true },

        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true, index: true },

        classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true, index: true },

        sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true, index: true },

        reportDefinitionId: { type: mongoose.Schema.Types.ObjectId, ref: "ReportDefinition", required: true },

        templateId: { type: mongoose.Schema.Types.ObjectId, ref: "ReportTemplate", required: true },

        templateVersion: { type: Number, required: true, min: 1, validate: { validator: Number.isInteger, message: "Template version must be an integer" } },

        reportType: { type: String, required: true, enum: ["ANNUAL_MARKSHEET", "EXAM_REPORT", "PROGRESS_REPORT"] },

        snapshotData: { type: mongoose.Schema.Types.Mixed, required: true },

        generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        generatedAt: { type: Date, required: true, default: Date.now },

        publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

        publishedAt: { type: Date, default: null },

        status: { type: String, required: true, enum: ["GENERATED", "VERIFIED", "PUBLISHED", "ARCHIVED"], default: "GENERATED" },

        fileUrl: { type: String, trim: true, maxlength: 1000, default: null },

        fileHash: { type: String, trim: true, maxlength: 128, default: null }
    },
    {
        timestamps: true
    }
);

reportSnapshotSchema.index({ schoolId: 1, studentId: 1, academicYearId: 1, reportType: 1 });

module.exports = mongoose.model("ReportSnapshot", reportSnapshotSchema);
