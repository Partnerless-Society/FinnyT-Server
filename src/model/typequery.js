import mongoose from "mongoose";

const Type = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    data: [
        {
            category: { type: String, required: true },
            income: { type: Number, default: 0 },
            outcome: { type: Number, default: 0 }
        }
    ]
});


export default mongoose.model("Type", Type);