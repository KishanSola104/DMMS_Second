const mongoose = require("mongoose");

const attendanceRecordSchema = new mongoose.Schema(
    {
        studentEnrollmentId: { type: mongoose.Schema.Types.ObjectId, ref: "StudentEnrollment", required: true, index: true },

        date: { type: Date, required: true },

        status: { type: String, required: true, enum: ["PRESENT", "ABSENT", "LATE", "HALF_DAY"] },

        remarks: { type: String, trim: true, maxlength: 500, default: null }
    },
    {
        timestamps: true
    }
);

attendanceRecordSchema.index({ studentEnrollmentId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("AttendanceRecord", attendanceRecordSchema);
