const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true, unique: true },

    userId: { type: String, required: true, unique: true, uppercase: true, trim: true },

    userName: { type: String, required: true, trim: true },

    roleIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    }],

    password: { type: String, required: true },

    accountStatus: { type: String, enum: ["Active", "Inactive", "Suspended"], default: "Active" },

    lastLogin: { type: Date, default: null },

    failedLoginAttempts: { type: Number, default: 0 },

    passwordChangedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);