import expressAsyncHandler from "express-async-handler";
import { Attendance } from "../schema/model.js";
import { successResponse } from "../helper/successResponse.js";
import { HttpStatus } from "../config/constant.js";

export let getAttendance = expressAsyncHandler(async (req, res, next) => {
  // try{

  //  let result = await User.find({name:"nitan"}) // this is exact searching
  //  let result = await User.find({name:"nitan",age:29}) /// this is exact searching
  //  let result = await User.find({age:{$gt:33}}) /// this is exact searching
  //  let result = await User.find({age:{$gte:33}}) /// this is exact searching
  //  let result = await User.find({age:{$lt:33}}) /// this is exact searching
  //  let result = await User.find({age:{$lte:33}}) /// this is exact searching
  //  let result = await User.find({age:{$ne:33}}) /// this is exact searching
  //  let result = await User.find({name:{$in:["nitan"]}}) /// this is exact searching

  //  let result = await User.find({$or:[{name:"a"},{name:"nitan"}]}) /// this is exact searching
  //  let result = await User.find({$and:[{age:33},{name:"nitan"}]}) /// this is exact searching
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
