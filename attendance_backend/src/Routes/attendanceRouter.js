import { Router } from "express";
import { getAttendance, postAttendance } from "../controllers/attendanceController.js";

let attendanceRouter = Router();

attendanceRouter.route("/attendance").get(getAttendance);
attendanceRouter.route("/attendance").post(postAttendance);


export default attendanceRouter;
