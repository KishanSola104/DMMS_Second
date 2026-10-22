const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
    {
        sectionId: { type: String, required: true },

        schoolId: { type: mongoose.Schema.Types.ObjectId, ref:"School", required:true},
        
        classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },

        section: { type: String, required: true, trim: true, uppercase: true },

        classTeacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },

        maximumCapacity: { type: Number, required: true, min: 1 },

        status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Section", sectionSchema);