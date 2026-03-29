import express from "express";
import { authcheck, loginmiddleware, signupmiddleware } from "../middleware/authmiddleware.js";
import { login, signup, userfetch } from "../controllers/authcontroller.js";

const userroute = express.Router();

userroute.post("/api/signup", signupmiddleware, signup );
userroute.post("/api/login", loginmiddleware, login );
userroute.get("/api/userinfo" , authcheck , userfetch);

export default userroute;