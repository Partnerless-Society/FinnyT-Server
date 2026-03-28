import mongoose from "mongoose";

const userquery = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, default: 'finnyT' },
},
{
    timestamps: true
});

export default mongoose.model("Users", userquery);