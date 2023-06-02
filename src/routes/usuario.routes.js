import express from "express";
import { newUser, getUser, login, logOut } from "../controllers/usuario.controller";
import { Authenticate } from "../helpers/token.helpers";

const userRoute = express.Router()

userRoute.post("/register", newUser)
userRoute.get("/registerUser", getUser)
userRoute.post("/login",[Authenticate] ,login)
userRoute.post("/loginOut", logOut)



export default userRoute