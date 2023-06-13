import expressAsyncHandler from "express-async-handler";
import { Student } from "../schema/mode.js";
import { successResponse } from "../helper/sucessResponse.js";
import { HttpStatus } from "../config/constant.js";

export let getStudent = expressAsyncHandler(async (req, res, next) => {
  let result = await Student.find({
    batchId: "6481986943933fbec54ae4b7",
  }).populate({
    path: "batchId",
    match: {
      name: "mern2",
    },
  });

  console.log(result, "resutl ..........................");

  let response = {
    res: res,
    message: "sucess",
    result: result,
    statusCode: HttpStatus.CREATED,
  };

  successResponse(response);
});
