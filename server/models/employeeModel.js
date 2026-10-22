const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, unique: true, required: true, trim: true, uppercase: true },

    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },

    firstName: { type: String, required: true, trim: true },

    lastName: { type: String, required: true, trim: true },

    gender: { type: String, enum: ["Male", "Female", "Other"], default: null },

    dob: { type: Date, default: null },

    email: { type: String, unique: true, required: true, lowercase: true, trim: true },

    mobileNumber: { type: String, unique: true, required: true, trim: true },

    address: { type: String, default: null, trim: true },

    qualification: { type: String, default: null, trim: true },

    experience: { type: String, default: null, trim: true },

    joiningDate: { type: Date, default: null },

    designation: { type: String, required: true, trim: true },

    department: { type: String, default: null, trim: true },

    salary: { type: Number, default: null },

    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Employee", employeeSchema);