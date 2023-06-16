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
import { isAuthenticatedAdmin } from "../middleware/isAuthenticated.js";

let adminRouter = Router();

adminRouter.route("/login").post(loginAdmin);

adminRouter.route("/add").post(isAuthenticatedAdmin,isAuthorizedAdmin,addAdmin);

adminRouter.route("/batch").get(isAuthenticatedAdmin,isAuthorizedAdmin,getBatch);

adminRouter.route("/batch").post(isAuthenticatedAdmin,isAuthorizedAdmin,addBatch);

adminRouter.route("/teacher").get(isAuthenticatedAdmin,isAuthorizedAdmin,getTeacher);

adminRouter.route("/teacher/:batchId").post(isAuthenticatedAdmin,isAuthorizedAdmin,addTeacher);

adminRouter.route("/student").get(isAuthenticatedAdmin,isAuthorizedAdmin,getStudent);

adminRouter.route("/student/:batchId").post(isAuthenticatedAdmin,isAuthorizedAdmin,addStudent);
adminRouter.route("/logout").get(isAuthenticatedAdmin,isAuthorizedAdmin,logout)
export default adminRouter;
