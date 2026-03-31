import mongoose from 'mongoose';

const monthlyReportSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users', 
        required: true 
    },
    month: { type: Number, required: true }, 
    year: { type: Number, required: true },  
    income: { type: Number, default: 0 },
    outcome: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    networth : {type : Number , default : 0}      
}, { 
    timestamps: true 
});

monthlyReportSchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model('MonthlyReport', monthlyReportSchema);