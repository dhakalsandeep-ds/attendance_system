import { Router } from "express";
import {
  getAllAttendance,
  studentList,
  submitAttendance,
} from "../controllers/attendanceController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isAuthorized } from "../middleware/isAuthorized.js";

let attendanceRouter = Router();

attendanceRouter
  .route("/:batchId")
  .get(isAuthenticated, isAuthorized, getAllAttendance);
attendanceRouter
  .route("/studentList/:batchId")
  .get(isAuthenticated, isAuthorized, studentList);
attendanceRouter
  .route("/submit/:batchId")
  .post(isAuthenticated, isAuthorized, submitAttendance);
attendanceRouter
  .route("/:batchId/:month")
  .get(isAuthenticated, isAuthorized, submitAttendance);

export default attendanceRouter;
