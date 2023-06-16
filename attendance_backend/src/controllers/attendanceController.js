import expressAsyncHandler from "express-async-handler";
import { Attendance } from "../schema/model.js";
import { successResponse } from "../helper/successResponse.js";
import { HttpStatus } from "../config/constant.js";

export let getAttendance = expressAsyncHandler(async (req, res, next) => {
  
  let result = await Attendance.find()
    .populate({
      path: "batchId",
      // match: {
      //   course: "dot net",
      // },
    })
    .populate({
      path: "studentId",
    }); /// this is exact searching
  let response = {
    res: res,
    message: "hello",
    result: result,
    statusCode: HttpStatus.CREATED,
  };

  successResponse(response);

  // }catch(error){

  //   let response = {
  //    "res":res,
  //    "message":error.message,
  //    "statusCode":HttpStatus.BAD_REQUEST
  //   }

  //  errorResponse(response)
  //   error.statusCode = HttpStatus.BAD_REQUEST
  //   next(error)

  // }
});
