const mongoose = require("mongoose");

const studentEnrollmentSchema = new mongoose.Schema(
    {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true, index: true },

        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true, index: true },

        academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear", required: true, index: true },

        classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true, index: true },

        sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true, index: true },

        rollNumber: { type: String, trim: true, maxlength: 30, default: null },

        enrollmentDate: { type: Date, required: true },

        status: { type: String, enum: ["ACTIVE", "PROMOTED", "TRANSFERRED", "WITHDRAWN", "COMPLETED"], required: true, default: "ACTIVE" },

        remarks: { type: String, trim: true, maxlength: 500, default: null }
    },
    {
        timestamps: true
    }
);

studentEnrollmentSchema.index(
    { studentId: 1, academicYearId: 1 },
    { unique: true }
);

module.exports = mongoose.model("StudentEnrollment", studentEnrollmentSchema);