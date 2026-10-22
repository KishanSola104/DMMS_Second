const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema(
    {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref:"School", required:true},
        
        name: { type: String, required: true, unique: true },

        sequence: { type: Number, default: 0 }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Counter", counterSchema);