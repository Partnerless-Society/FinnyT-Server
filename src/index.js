import express from "express";
import cors from "cors";
import userroute from "./routes/userroute.js";

const app = express();

app.use(express.json());
app.use(cors({
   credentials : true
}));

app.use("/user", userroute);

app.listen(4000, () => console.log("Server running..."));
