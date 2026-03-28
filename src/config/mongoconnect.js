import mongoose from "mongoose";
import "../config/dotenvservice.js";

export const mongoconnect = async () => {
    await mongoose.connect(process.env.URI)
    .then(() => console.log("Connected Successfully"))
    .catch(() => console.log("Error Connecting"))
}