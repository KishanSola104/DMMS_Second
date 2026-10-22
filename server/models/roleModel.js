const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    roleCode: { type: String, required: true, unique: true, uppercase: true, trim: true },

    roleName: { type: String, required: true, unique: true, trim: true },
    
    description: { type: String, default: null },

    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Role || mongoose.model("Role", roleSchema);

