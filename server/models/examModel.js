const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
    {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true, index: true },

        academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear", required: true, index: true },

        name: { type: String, required: true, trim: true, maxlength: 100 },

        code: { type: String, required: true, trim: true, maxlength: 30 },

        sequence: {
            type: Number,
            required: true,
            min: 0,
            validate: {
                validator: Number.isInteger,
                message: "Sequence must be an integer"
            }
        },

        startDate: { type: Date, default: null },

        endDate: { type: Date, default: null },

        status: { type: String, required: true, enum: ["DRAFT", "SCHEDULED", "ONGOING", "COMPLETED", "CANCELLED"], default: "DRAFT" },

        description: { type: String, trim: true, maxlength: 500, default: null },

        applicableClasses: {
            type: [
                {
                    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },

                    className: { type: String, required: true, trim: true, maxlength: 100 },

                    classCode: { type: String, trim: true, maxlength: 30, default: null }
                }
            ],
            required: true,
            validate: {
                validator: function (classes) {
                    return classes.length > 0;
                },
                message: "At least one applicable class is required"
            }
        }
    },
    {
        timestamps: true
    }
);


examSchema.index(
    { academicYearId: 1, code: 1 },
    { unique: true }
);

module.exports = mongoose.model("Exam", examSchema);