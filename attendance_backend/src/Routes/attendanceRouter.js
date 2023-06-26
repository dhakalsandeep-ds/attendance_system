import { Router } from "express";
import {
  getAllAttendance,
  getAttendanceByDate,
  studentList,
  submitAttendance,
} from "../controllers/attendanceController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isAuthorized } from "../middleware/isAuthorized.js";

let attendanceRouter = Router();

 attendanceRouter
   .route("/:batchId/:year/:month")
   .get(isAuthenticated, isAuthorized, getAttendanceByDate);
attendanceRouter
  .route("/studentList/:batchId")
  .get(isAuthenticated, isAuthorized, studentList);
attendanceRouter
  .route("/submit/:batchId")
  .post(isAuthenticated, isAuthorized, submitAttendance);
  attendanceRouter
  .route("/:batchId")
  .get(isAuthenticated, isAuthorized, getAllAttendance);
export default attendanceRouter;
