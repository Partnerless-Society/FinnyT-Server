import express from "express";
import { authcheck } from "../../middleware/authmiddleware.js";
import { AddUrl, fetchservicedata, fetchurl, Testconnection } from "../../controllers/Ai/Servicecontroller.js";

const serviceroute = express.Router();

serviceroute.post("/api/test", authcheck, Testconnection);
serviceroute.post("/api/addurl" , authcheck , AddUrl);
serviceroute.get("/api/fetchurl" , authcheck, fetchurl);
serviceroute.get("/api/fetch", authcheck, fetchservicedata);

export default serviceroute;