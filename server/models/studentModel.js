const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        studentId: { type: String, unique: true, required: true },

        schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },

        admissionNo: { type: String, unique: true, required: true },

        admissionClass: { type: String, required: true },

        admissionDate: { type: Date, required: true },

        admissionAcademicYearId: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear", required: true },

        firstName: { type: String, required: true },

        lastName: { type: String, required: true },

        gender: { type: String, enum: ["Male", "Female", "Other"], required: true },

        dob: { type: Date, required: true },

        bloodGroup: { type: String, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], required: true },

        religion: { type: String, required: true },

        address: { type: String, required: true },

        fatherName: { type: String, required: true },

        fatherOccupation: { type: String, required: true },

        fatherContact: { type: String, required: true },

        motherName: { type: String, required: true },

        motherOccupation: { type: String, required: true },

        motherContact: { type: String, required: true },

        classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },

        sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },

        rollNo: { type: String, required: true },

        academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear", required: true },

        status: { type: String, enum: ["Active", "Inactive", "Left", "Completed"], default: "Active" }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Student", studentSchema);