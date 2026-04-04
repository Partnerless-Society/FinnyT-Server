import express from "express"
import { authcheck } from "../../middleware/authmiddleware.js";
import { Dashboarddata } from "../../controllers/Backend/dashboardcontroller.js";
import { create, fetchchartincome, fetchchartoutcome, fetchtrackincome, fetchtrackoutcome } from "../../controllers/Backend/incomeoutcomecontroller.js";
import { fetchyears, getMonthlyData } from "../../controllers/Backend/monthlydatacontroller.js";

const dataroute = express.Router();

dataroute.post("/api/create" , authcheck , create);
dataroute.get("/api/fetchtrackincome" , authcheck , fetchtrackincome);
dataroute.get("/api/fetchtrackoutcome" , authcheck , fetchtrackoutcome);
dataroute.get("/api/fetchchartincome" , authcheck , fetchchartincome);
dataroute.get("/api/fetchchartoutcome" , authcheck , fetchchartoutcome);
dataroute.get("/api/dashboarddata" , authcheck , Dashboarddata);
dataroute.get("/api/getyears" , authcheck, fetchyears);
dataroute.get("/api/getmonthlydatas" , authcheck, getMonthlyData);

export default dataroute;