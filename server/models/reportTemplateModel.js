const mongoose = require("mongoose");

const reportTemplateSchema = new mongoose.Schema(
    {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true, index: true },

        name: { type: String, required: true, trim: true, maxlength: 150 },

        version: { type: Number, required: true, min: 1, validate: { validator: Number.isInteger, message: "Version must be an integer" } },

        pageSize: { type: String, required: true, enum: ["A4", "A3", "LETTER", "LEGAL"], default: "A4" },

        orientation: { type: String, required: true, enum: ["PORTRAIT", "LANDSCAPE"], default: "PORTRAIT" },

        sections: [
            {
                code: { type: String, required: true, trim: true, uppercase: true, maxlength: 50 },

                sectionType: { type: String, required: true, enum: ["STUDENT_INFO", "RESULT_TABLE", "ATTENDANCE", "REMARKS", "SIGNATURES", "TEXT"] },

                displayOrder: { type: Number, required: true, min: 0, validate: { validator: Number.isInteger, message: "Display order must be an integer" } },

                height: { type: Number, min: 0, default: null },

                configuration: { type: mongoose.Schema.Types.Mixed, default: {} }
            }
        ],
        status: { type: String, required: true, enum: ["DRAFT", "ACTIVE", "INACTIVE"], default: "DRAFT" }
    },
    {
        timestamps: true
    }
);

reportTemplateSchema.index({ schoolId: 1, name: 1, version: 1 }, { unique: true });

reportTemplateSchema.path("sections").validate(function (sections) {
    return sections.length > 0;
}, "At least one template section is required");

module.exports = mongoose.model("ReportTemplate", reportTemplateSchema);
