import { Router } from "express";
import {
  addAdmin,
  addBatch,
  addStudent,
  addTeacher,
  authenticateLogin,
  getBatch,
  getStudent,
  getTeacher,
  loginAdmin,
} from "../controllers/adminController.js";

let adminRouter = Router();

adminRouter.route("/login").post(loginAdmin);
adminRouter.route("/login/authenticate").post(authenticateLogin);

adminRouter.route("/add").post(addAdmin);

adminRouter.route("/batch").get(getBatch);

adminRouter.route("/batch/add").post(addBatch);

adminRouter.route("/teacher").get(getTeacher);

adminRouter.route("/teacher/add").post(addTeacher);

adminRouter.route("/student").get(getStudent);

adminRouter.route("/student/add").post(addStudent);

export default adminRouter;
