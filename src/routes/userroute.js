import express from "express";
import { loginmiddleware, signupmiddleware } from "../middleware/authmiddleware.js";
import { login, signup } from "../controllers/authcontroller.js";

const userroute = express.Router();

userroute.post("/api/signup", signupmiddleware, signup );
userroute.post("/api/login", loginmiddleware, login );

export default userroute;