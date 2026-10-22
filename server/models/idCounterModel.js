const mongoose = require("mongoose");

const idCounterSchema = new mongoose.Schema(
    {
        schoolId: { type: mongoose.Schema.Types.ObjectId, ref:"School", required:true},
        
        counterId: { type: String, unique: true, required: true },

        entityName: { type: String, unique: true, required: true },

        prefix: { type: String, required: true },

        lastSequenceNumber: { type: Number, default: 0 }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("IdCounter", idCounterSchema);