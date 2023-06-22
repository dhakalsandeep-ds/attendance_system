import { Router } from "express";
import { attendanceDetail, loginStudent, logoutStudent, showEnrolledClasses, studentDetail } from "../controllers/studentController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isAuthorizedStudent } from "../middleware/isAuthorized.js";

export let studentRouter=Router()
studentRouter.route("/login").post(loginStudent)
studentRouter.route("/logout").get(isAuthenticated,isAuthorizedStudent,logoutStudent)
studentRouter.route("/class").get(isAuthenticated,isAuthorizedStudent,showEnrolledClasses)
studentRouter.route("/student-detail").get(isAuthenticated,isAuthorizedStudent,studentDetail)
studentRouter.route("/attendance-detail/:batchId").get(isAuthenticated,isAuthorizedStudent,attendanceDetail)
