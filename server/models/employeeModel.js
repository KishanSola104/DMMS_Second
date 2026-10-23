const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true, index: true },

    employeeCode: { type: String, required: true, trim: true, maxlength: 30 },

    firstName: { type: String, required: true, trim: true, maxlength: 100 },

    middleName: { type: String, trim: true, maxlength: 100, default: null },

    lastName: { type: String, required: true, trim: true, maxlength: 100 },

    dateOfBirth: { type: Date, default: null },

    gender: { type: String, enum: ["MALE", "FEMALE", "OTHER"], default: null },

    designation: { type: String, required: true, trim: true, maxlength: 100 },

    phone: { type: String, required: true, trim: true, maxlength: 20 },

    email: { type: String, unique: true, required: true, lowercase: true, trim: true, maxlength: 150 },

    qualification: { type: String, required: true, trim: true, maxlength: 100 },

    experience: { type: String, default: null, trim: true, maxlength: 100 },

    joiningDate: { type: Date, required: true },

    salary: { type: Number, required: true },

    status: { type: String, enum: ["ACTIVE", "INACTIVE", "LEFT"], default: "ACTIVE", required: true },
  },
  {
    timestamps: true
  }
);

employeeSchema.index(
  { schoolId: 1, employeeCode: 1 },
  { unique: true }
);


module.exports = mongoose.model("Employee", employeeSchema);