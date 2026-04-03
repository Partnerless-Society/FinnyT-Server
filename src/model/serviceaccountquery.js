import mongoose from "mongoose";

const serviceaccount = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    email: { type: String },
    key: { type: String },
    date: { type: Date },
    url : {type : String}
}, {
    timestamps: true
});

export default mongoose.model("Service", serviceaccount);