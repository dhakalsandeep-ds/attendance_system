import expressAsyncHandler from "express-async-handler";
import { Attendance, Student } from "../schema/model.js";
import { successResponse } from "../helper/successResponse.js";
import { HttpStatus } from "../config/constant.js";

export let studentList = expressAsyncHandler(async (req, res, next) => {
  let _batchId = req.params.batchId;
  let studentList = await Student.find({ batchId: _batchId });
  let response = {
    res,
    result: studentList,
    message: "All students of this Batch",
    statusCode: HttpStatus.OK,
  };
  successResponse(response);
});

export let submitAttendance = expressAsyncHandler(async (req, res, next) => {
  let _batchId = req.params.batchId;
  let _data = req.body.data;
  let check = await Attendance.find({ batchId: _batchId, Date: Date.now });
  console.log(check, "checking");
  if (check[0] !== undefined) {
    let error = new Error("Attendance for today is already submitted");
    error.statusCode = 409;
    throw error;
  }
  _data.year = new Date().getYear() + 1900;
  _data.month = new Date().getMonth() + 1;
  for (let i = 0; i < _data.length; i++) {
    let status = _data[i].status === "P" ? 0 : _data[i].status === "A" ? 1 : 2;
    await Attendance.create({
      status,
      studentId: _data[i].studentId,
      batchId: _batchId,
      year: _data.year,
      month: _data.month,
    });
  }
  let response = {
    res,
    message: "Attendance Successfully submitted",
    statusCode: HttpStatus.OK,
  };
  successResponse(response);
});

export let getAttendanceByDate = expressAsyncHandler(async (req, res, next) => {
  let _batchId = req.params.batchId;
  let desiredYear = req.params.year;
  let desiredMonth = req.params.month;
  let result = await Attendance.find({
    batchId: _batchId,
    year: desiredYear,
    month: desiredMonth,
  })
    .populate({
      path: "studentId",
    })
    .populate({
      path: "batchId",
    });
  let response = {
    res,
    message: "Attendance Report",
    result,
    statusCode: HttpStatus.OK,
  };

  successResponse(response);
});

export let getAllAttendance = expressAsyncHandler(async (req, res, next) => {
  let _batchId = req.params.batchId;
  let result = await Attendance.find({ batchId: _batchId });
  console.log(typeof result[1].date);
  // let result = await Attendance.find({ batchId: _batchId })
  //   .populate({
  //     path: "studentId",
  //   })
  //   .populate({
  //     path: "batchId",
  //   });
  // console.log(result);
  // let response = {
  //   res,
  //   message: "Attendance Report",
  //   result,
  //   statusCode: HttpStatus.OK,
  // };

  // successResponse(response);
});
