const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true, index: true },

    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true, index: true },

    userName: { type: String, required: true, unique: true, trim: true, maxlength: 50 },

    email: { type: String, unique: true, required: true, lowercase: true, trim: true, maxlength: 150 },

    passwordHash: { type: String, required: true, maxlength: 255 },

    roleIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true
    }],

    status: { type: String, enum: ["ACTIVE", "INACTIVE", "LOCKED"], required: true, default: "ACTIVE" },

    lastLoginAt: { type: Date, default: null },

    passwordChangedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);