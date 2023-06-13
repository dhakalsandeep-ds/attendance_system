import { Router } from "express";

import { getTeacher } from "../controllers/teacherController.js";

let teacherRouter = Router();

teacherRouter.route("/").get(getTeacher);
//   .post(createReview)
//   .get(readReview);

// reviewRouter
//   .route("/:id")
//   .get(readDetailReview)
//   .patch(updateReview)
//   .delete(deleteReview);

export default teacherRouter;
