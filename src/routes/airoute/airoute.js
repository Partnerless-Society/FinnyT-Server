import express from "express";
import { authcheck } from "../../middleware/authmiddleware.js";
import { AiAnalytics } from "../../controllers/Ai/AiAnalyticcontroller.js";
import { Aiagentcontroller } from "../../controllers/Ai/AiAgentdatacontroller.js";
import upload from "../../middleware/multer.js";

const airoute = express.Router();

airoute.post("/api/aianalyse", authcheck, AiAnalytics);
airoute.post("/api/aiagent", authcheck, upload.single('file'), Aiagentcontroller);

export default airoute;