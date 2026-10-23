const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true, index: true },

        studentId: { type: String, required: true, trim: true, maxlength: 50 },

        admissionNumber: { type: String, required: true, trim: true, maxlength: 50 },

        admissionClass: { type: String, required: true, trim: true, maxlength: 100 },

        admissionDate: { type: Date, required: true },

        admissionAcademicYearId: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear", required: true, index: true },

        firstName: { type: String, required: true, trim: true, maxlength: 100 },

        lastName: { type: String, required: true, trim: true, maxlength: 100 },

        dateOfBirth: { type: Date, required: true },

        gender: { type: String, enum: ["MALE", "FEMALE", "OTHER"], required: true },

        bloodGroup: { type: String, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], required: true },

        religion: { type: String, required: true, trim: true, maxlength: 50 },

        address: { type: String, required: true, trim: true, maxlength: 500 },

        fatherName: { type: String, required: true, trim: true, maxlength: 100 },

        fatherOccupation: { type: String, required: true, trim: true, maxlength: 100 },

        fatherContact: { type: String, required: true, trim: true, maxlength: 20 },

        motherName: { type: String, required: true, trim: true, maxlength: 100 },

        motherOccupation: { type: String, required: true, trim: true, maxlength: 100 },

        motherContact: { type: String, required: true, trim: true, maxlength: 20 },

        classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true, index: true },

        profilePhotoUrl: { type: String, trim: true, maxlength: 500, default: null },

        status: { type: String, enum: ["ACTIVE", "INACTIVE", "TRANSFERRED", "ALUMNI"], default: "ACTIVE" }
    },
    {
        timestamps: true
    }
);
studentSchema.index(
    { schoolId: 1, studentId: 1 },
    { unique: true }
);

studentSchema.index(
    { schoolId: 1, admissionNumber: 1 },
    { unique: true }
);

module.exports = mongoose.model("Student", studentSchema);