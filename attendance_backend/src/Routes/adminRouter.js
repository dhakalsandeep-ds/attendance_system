import { Router } from "express";
import {
  addAdmin,
  addBatch,
  addStudent,
  addTeacher,
  getBatch,
  getStudent,
  getTeacher,
  loginAdmin,
  logout,
} from "../controllers/adminController.js";
import { isAuthorizedAdmin } from "../middleware/isAuthorized.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

let adminRouter = Router();

adminRouter.route("/login").post(loginAdmin);

adminRouter.route("/add").post(isAuthenticated, isAuthorizedAdmin, addAdmin);

adminRouter.route("/batch").get(isAuthenticated, isAuthorizedAdmin, getBatch);

adminRouter.route("/batch").post(isAuthenticated, isAuthorizedAdmin, addBatch);

adminRouter
  .route("/teacher")
  .get(isAuthenticated, isAuthorizedAdmin, getTeacher);

adminRouter
  .route("/teacher/:batchId")
  .post(isAuthenticated, isAuthorizedAdmin, addTeacher);

adminRouter
  .route("/student")
  .get(isAuthenticated, isAuthorizedAdmin, getStudent);

adminRouter
  .route("/student/:batchId")
  .post(isAuthenticated, isAuthorizedAdmin, addStudent);

adminRouter.route("/logout").get(isAuthenticated, isAuthorizedAdmin, logout);

export default adminRouter;
