import mongoose from "mongoose";

const incomeoutcome = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    data: [
        {
            type: { type: String },
            source: { type: String },
            category: { type: String },
            date: { type: Date },
            amount: { type: Number }
        }
    ]
})

export default mongoose.model("IncomeOutcome", incomeoutcome);