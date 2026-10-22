const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
    {
        auditLogId: { type: String, unique: true, required: true },

        schoolId: { type: mongoose.Schema.Types.ObjectId, ref:"School", required:true},

        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        action: { type: String, enum: ["CREATE", "UPDATE", "DELETE", "LOGIN", "LOGOUT", "PASSWORD_CHANGE", "STATUS_CHANGE"], required: true },

        entity: { type: String, required: true, enum: ["School", "AcademicYear", "Employee", "User", "Student", "Class", "Section", "Subject", "Exam", "Mark", "Role", "Notification"] },

        entityId: { type: mongoose.Schema.Types.ObjectId, required: true },

        oldData: { type: mongoose.Schema.Types.Mixed, default: null },

        newData: { type: mongoose.Schema.Types.Mixed, default: null },

        ipAddress: { type: String, default: null }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);