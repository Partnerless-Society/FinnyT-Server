import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userroute from "./routes/backendroute/userroute.js";
import { mongoconnect } from "./services/mongoconnect.js";
import dataroute from "./routes/backendroute/dataroute.js";
import airoute from "./routes/airoute/airoute.js";

await mongoconnect();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.log(err.message);
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
    else if (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Unexpected Error"
        })
    }
    next();
})


app.use("/user", userroute);
app.use("/data", dataroute);
app.use("/ai", airoute);

app.listen(4000, () => console.log("Server running..."));
