const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true, maxlength: 50 },

    code: { type: String, required: true, unique: true, uppercase: true, trim: true, maxlength: 30 },

    description: { type: String, trim: true, maxlength: 200, default: null },

    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE", required: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Role", roleSchema);

