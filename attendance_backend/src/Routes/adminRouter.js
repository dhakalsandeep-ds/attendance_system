import { Router } from "express";
import {
  addAdmin,
  addBatch,
  addStudent,
  addTeacher,
  assignTeacher,
  getBatch,
  getBatchDetails,
  getStudent,
  getStudentDetail,
  getTeacher,
  getTeacherDetail,
  insertStudent,
  loginAdmin,
  logout,
} from "../controllers/adminController.js";
import { isAuthorizedAdmin } from "../middleware/isAuthorized.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

let adminRouter = Router();

adminRouter.route("/login").post(loginAdmin);
adminRouter.route("/logout").get(isAuthenticated,isAuthorizedAdmin,logout)

//Batch operation
adminRouter.route("/add").post(isAuthenticated,isAuthorizedAdmin,addAdmin)
adminRouter.route("/batch").get(isAuthenticated,isAuthorizedAdmin,getBatch)
adminRouter.route("/batch").post(isAuthenticated,isAuthorizedAdmin,addBatch)
adminRouter.route("/batch/:batchId").get(isAuthenticated,isAuthorizedAdmin,getBatchDetails)

//Teacher
adminRouter.route("/teacher").get(isAuthenticated,isAuthorizedAdmin,getTeacher)
adminRouter.route("/teacher").post(isAuthenticated,isAuthorizedAdmin,addTeacher)
adminRouter.route("/teacher/:teacherId").get(isAuthenticated,isAuthorizedAdmin,getTeacherDetail)
adminRouter.route("/teacher/:teacherId/:batchId").put(isAuthenticated,isAuthorizedAdmin,assignTeacher)

//Student
adminRouter.route("/student").get(isAuthenticated,isAuthorizedAdmin,getStudent)
adminRouter.route("/student").post(isAuthenticated,isAuthorizedAdmin,addStudent)
adminRouter.route("/student/:studentId").get(isAuthenticated,isAuthorizedAdmin,getStudentDetail)
adminRouter.route("/student/:studentId/:batchId").put(isAuthenticated,isAuthorizedAdmin,insertStudent)

export default adminRouter;
