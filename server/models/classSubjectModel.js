const mongoose = require("mongoose");

const classSubjectSchema = new mongoose.Schema(
    {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref:"School", required:true},
        
        classSubjectId: { type: String, unique: true, required: true, trim: true },

        classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },

        sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },

        subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },

        subjectTeacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },

        status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("ClassSubject", classSubjectSchema);