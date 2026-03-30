import express from "express";
import { authcheck } from "../../middleware/authmiddleware.js";
import { AiAnalytics } from "../../controllers/Ai/AiAnalyticcontroller.js";

const airoute = express.Router();

airoute.post("/api/aianalyse" , authcheck, AiAnalytics);

export default airoute;