import mongoose from "mongoose";

const supportquery = new mongoose.Schema({
    name : { type: String },
    email : { type: String },
    message : { type: String }
}, {
    timestamps: true
});

export default mongoose.model("Support", supportquery);