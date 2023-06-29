import { Router } from "express"
import { TokenVerification, login, logout } from "../controllers/helperController.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js"

export let helperRouter=Router()
helperRouter.route("/login").post(login)
helperRouter.route("/verifyToken").get(TokenVerification)
helperRouter.route("/logout").get(isAuthenticated, logout)