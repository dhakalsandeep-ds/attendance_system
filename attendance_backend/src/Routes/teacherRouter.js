import { Router } from "express";
import { loginTeacher } from "../controllers/teacherController.js";

export let teacherRouter=Router()
teacherRouter.route("/login").post(loginTeacher)