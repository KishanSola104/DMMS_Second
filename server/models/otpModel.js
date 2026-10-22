const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, lowercase: true, trim: true },

        otp: { type: String, required: true },

        purpose: { type: String, enum: ["REGISTER", "LOGIN", "FORGOT_PASSWORD", "EMAIL_VERIFICATION"], required: true },

        expiresAt: { type: Date, required: true },

        isVerified: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

// Automatically delete expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Otp", otpSchema);