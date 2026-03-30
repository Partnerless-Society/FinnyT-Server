import express from "express"
import { authcheck } from "../../middleware/authmiddleware.js";
import { Dashboarddata } from "../../controllers/Backend/dashboardcontroller.js";

const dataroute = express.Router();

dataroute.get("/api/dashboarddata" , authcheck , Dashboarddata);

export default dataroute;