import { Router } from "express";
import { getAttendance } from "../controllers/attendanceController.js";

let attendanceRouter = Router();

attendanceRouter.route("/").get(getAttendance);
//   .post(createReview)
//   .get(readReview);

// reviewRouter
//   .route("/:id")
//   .get(readDetailReview)
//   .patch(updateReview)
//   .delete(deleteReview);

export default attendanceRouter;
