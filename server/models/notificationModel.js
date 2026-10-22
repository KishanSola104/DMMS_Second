const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref:"School", required:true},
        
        notificationId: { type: String, unique: true, required: true },

        receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        title: { type: String, required: true, trim: true },

        message: { type: String, required: true, trim: true },

        type: { type: String, enum: ["GENERAL", "ACADEMIC", "EXAM", "ASSIGNMENT", "ATTENDANCE", "FEE", "LEAVE", "HOLIDAY", "SYSTEM"], default: "GENERAL" },

        isRead: { type: Boolean, default: false },

        readAt: { type: Date, default: null }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Notification", notificationSchema);