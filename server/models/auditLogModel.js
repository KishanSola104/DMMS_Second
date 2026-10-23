const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
    {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true, index: true },

        academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear", default: null, index: true },

        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },

        userRole: { type: String, trim: true, maxlength: 50, default: null },

        action: { type: String, required: true, trim: true, uppercase: true, maxlength: 50 },

        entityType: { type: String, required: true, trim: true, maxlength: 100 },

        entityId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },

        oldValue: { type: mongoose.Schema.Types.Mixed, default: null },

        newValue: { type: mongoose.Schema.Types.Mixed, default: null }
    },
    {
        timestamps: { createdAt: true, updatedAt: false }
    }
);

auditLogSchema.index({ schoolId: 1, createdAt: -1 });
auditLogSchema.index({ schoolId: 1, entityType: 1, entityId: 1, createdAt: -1 });

module.exports = mongoose.model("AuditLog", auditLogSchema);
