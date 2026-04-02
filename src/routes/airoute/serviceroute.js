import express from "express";
import { authcheck } from "../../middleware/authmiddleware.js";
import { Testconnection } from "../../controllers/Ai/AiAgentGooglesheetcontroller.js";

const serviceroute = express.Router();

serviceroute.post("/api/test", authcheck, Testconnection);

export default serviceroute;