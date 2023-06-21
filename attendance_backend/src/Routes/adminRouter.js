import { Router } from "express";
import {
  addAdmin,
  addBatch,
  addStudent,
  addTeacher,
  getBatch,
  getBatchDetails,
  getStudent,
  getTeacher,
  getTeacherDetail,
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
adminRouter.route("/teacher").get(isAuthenticated,isAuthorizedAdmin,getTeacher);
adminRouter.route("/teacher/:teacherId").get(isAuthenticated,isAuthorizedAdmin,getTeacherDetail);
adminRouter.route("/teacher/:batchId").post(isAuthenticated,isAuthorizedAdmin,addTeacher);

//Student
adminRouter.route("/student").get(isAuthenticated,isAuthorizedAdmin,getStudent);
adminRouter.route("/student/:batchId").post(isAuthenticated,isAuthorizedAdmin,addStudent);

export default adminRouter;
