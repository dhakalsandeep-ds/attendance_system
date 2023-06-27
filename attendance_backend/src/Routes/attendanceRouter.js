import { Router } from "express";
import {
  exportAllAttendance,
  exportAttendanceByDate,
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

  attendanceRouter
  .route("/export/:batchId")
  .get(isAuthenticated, isAuthorized, exportAllAttendance);

  attendanceRouter
  .route("/export/:batchId/:year/:month")
  .get(isAuthenticated, isAuthorized, exportAttendanceByDate);
export default attendanceRouter;
