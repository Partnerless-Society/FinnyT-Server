import express from "express";
import { authcheck, loginmiddleware, signupmiddleware } from "../../middleware/authmiddleware.js";
import { handlelogout, login, signup, userfetch } from "../../controllers/Backend/authcontroller.js";

const userroute = express.Router();

userroute.post("/api/signup", signupmiddleware, signup );
userroute.post("/api/login", loginmiddleware, login );
userroute.get("/api/userinfo" , authcheck , userfetch);
userroute.post("/api/logout", authcheck, handlelogout);

export default userroute;