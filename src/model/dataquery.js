import mongoose from "mongoose";

const data = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    income: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    outcome: { type: Number, default: 0 }
}, {
    timestamps: true
})

export default mongoose.model("data", data);