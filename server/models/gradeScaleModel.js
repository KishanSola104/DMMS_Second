
const mongoose = require("mongoose");

const gradeScaleSchema = new mongoose.Schema(
    {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true, index: true },

        name: { type: String, required: true, trim: true, maxlength: 100 },

        bands: [
            {
                grade: { type: String, required: true, trim: true, maxlength: 20 },

                minPercentage: { type: Number, required: true, min: 0, max: 100 },

                maxPercentage: { type: Number, required: true, min: 0, max: 100 }
            }
        ],
        status: { type: String, required: true, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" }
    },
    {
        timestamps: true
    }
);

gradeScaleSchema.index({ schoolId: 1, name: 1 }, { unique: true });

gradeScaleSchema.path("bands").validate(function (bands) {
    return bands.length > 0;
}, "At least one grade band is required");

module.exports = mongoose.model("GradeScale", gradeScaleSchema);
