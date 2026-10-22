const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
    {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref:"School", required:true},
        
        examId: { type: String, unique: true, required: true, trim: true },

        examName: { type: String, required: true, trim: true },

        classIds: [
            {
                type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true
            }
        ],

        academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear", required: true },

        startDate: { type: Date, required: true },

        endDate: { type: Date, required: true },

        resultPublished: { type: Boolean, default: false },

        status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Exam", examSchema);