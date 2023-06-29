import { Router } from "express";
import {
  addAdmin,
  addBatch,
  addStudent,
  addTeacher,
  assignTeacher,
  deleteStudent,
  deleteTeacher,
  getBatch,
  getBatchDetails,
  getBatchStudent,
  getBatchTeacher,
  getStudent,
  getStudentDetail,
  getTeacher,
  getTeacherDetail,
  insertStudent,
  loginAdmin,
  logout,
  updateBatch,
  updateStudent,
  updateTeacher,
} from "../controllers/adminController.js";
import { isAuthorizedAdmin } from "../middleware/isAuthorized.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

let adminRouter = Router();

adminRouter.route("/login").post(loginAdmin);
adminRouter.route("/logout").get(isAuthenticated, isAuthorizedAdmin, logout);
adminRouter.route("/add").post(isAuthenticated, isAuthorizedAdmin, addAdmin);

//Batch operation
adminRouter.route("/batch").get(isAuthenticated, isAuthorizedAdmin, getBatch);
adminRouter.route("/batch").post(isAuthenticated, isAuthorizedAdmin, addBatch);
adminRouter
  .route("/batch/:batchId")
  .put(isAuthenticated, isAuthorizedAdmin, updateBatch);
adminRouter
  .route("/batch/:batchId")
  .get(isAuthenticated, isAuthorizedAdmin, getBatchDetails);

//Teacher
adminRouter
  .route("/teacher")
  .get(isAuthenticated, isAuthorizedAdmin, getTeacher)
  .post(isAuthenticated, isAuthorizedAdmin, addTeacher);

adminRouter
  .route("/teacher/:teacherId")
  .get(isAuthenticated, isAuthorizedAdmin, getTeacherDetail)
  .put(isAuthenticated, isAuthorizedAdmin, updateTeacher)
  .delete(isAuthenticated, isAuthorizedAdmin, deleteTeacher);
adminRouter
  .route("/teacher/:teacherId/:batchId")
  .put(isAuthenticated, isAuthorizedAdmin, assignTeacher);
adminRouter
  .route("/teacher/batch/:batchId")
  .get(isAuthenticated, isAuthorizedAdmin, getBatchTeacher);

//Student
adminRouter
  .route("/student")
  .get(isAuthenticated, isAuthorizedAdmin, getStudent)
  .post(isAuthenticated, isAuthorizedAdmin, addStudent);

adminRouter
  .route("/student/:studentId")
  .get(isAuthenticated, isAuthorizedAdmin, getStudentDetail)
  .put(isAuthenticated, isAuthorizedAdmin, updateStudent)
  .delete(isAuthenticated, isAuthorizedAdmin, deleteStudent);
adminRouter
  .route("/student/:studentId/:batchId")
  .put(isAuthenticated, isAuthorizedAdmin, insertStudent);
adminRouter
  .route("/student/batch/:batchId")
  .get(isAuthenticated, isAuthorizedAdmin, getBatchStudent);

export default adminRouter;
