import { Router } from "express";
import { getStudent } from "../controllers/studentController.js";

let studentRouter = Router();

studentRouter.route("/").get(getStudent);
//   .post(createReview)
//   .get(readReview);

// reviewRouter
//   .route("/:id")
//   .get(readDetailReview)
//   .patch(updateReview)
//   .delete(deleteReview);

export default studentRouter;
