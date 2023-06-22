import { Router } from "express";
import { loginTeacher, logoutTeacher, showAllBatch} from "../controllers/teacherController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isAuthorizedTeacher } from "../middleware/isAuthorized.js";

export let teacherRouter=Router()
teacherRouter.route("/login").post(loginTeacher)
teacherRouter.route("/logout").get(isAuthenticated,isAuthorizedTeacher,logoutTeacher)
teacherRouter.route("/batch").get(isAuthenticated,isAuthorizedTeacher,showAllBatch)
