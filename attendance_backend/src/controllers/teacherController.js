import expressAsyncHandler from "express-async-handler";
import { Attendance, Batch, Student, Teacher, Token } from "../schema/model.js";
import { comparePassword } from "../utils/Hashing.js";
import { generateToken } from "../utils/token.js";
import { HttpStatus } from "../config/constant.js";
import { successResponse } from "../helper/successResponse.js";

export let loginTeacher = expressAsyncHandler(async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let result = await Teacher.findOne({ email });
  let jwt_token;
  if (await comparePassword(password, result.password)) {
    let infoObj = {
      id: result._id,
      role: "teacher",
    };
    let expireInfo = {
      expiresIn: "1d",
    };
    jwt_token = await generateToken(infoObj, expireInfo);
    await Token.create({ token: jwt_token });
  } else {
    let error = new Error("Credential didn't match");
    error.statusCode = 401;
    throw error;
  }

  let response = {
    res: res,
    message: "successfully logged in as Teacher",
    result: {
      token: jwt_token,
    },
    statusCode: HttpStatus.CREATED,
  };

  successResponse(response);
});

export let logoutTeacher = expressAsyncHandler(async (req, res, next) => {
  let id = req.body.token.tokenId;
  await Token.findByIdAndDelete({ _id: id });
  let response = {
    res: res,
    message: "successfully logged out",
    statusCode: HttpStatus.CREATED,
  };

  successResponse(response);
});

export let showAllBatch = expressAsyncHandler(async (req, res, next) => {
  let teacherId = req.body.info.id;
  let teacher = await Teacher.findOne({ _id: teacherId });
  let numberOfBatch = teacher.batchId.length;
  let result = [];
  for (let i = 0; i < numberOfBatch; i++) {
    result.push(await Batch.findById({ _id: teacher.batchId[i] }));
  }
  let response = {
    res,
    result,
    message: "successfully logged out",
    statusCode: HttpStatus.OK,
  };

  successResponse(response);
});

export let showAllStudentWithAttendance = expressAsyncHandler(
  async (req, res, next) => {
    // let _batchId=req.params.batchId
    // let studentDetails=await Student.find({batchId:_batchId})
    // let studentKoIdHaru=studentDetails.map((value,index)=>{
    //   return {
    //     _studentId: value._id
    //   }
    // })
    // let attendanceDetails=[]
    // for(let i=0;i<studentKoIdHaru.length;i++) {
    // attendanceDetails.push(await Attendance.find({batchId:_batchId,studentId:studentKoIdHaru[i]._studentId}))
    // }
    // let finalArr=[
    //   {
    //     "name":
    //   }
    // ]
  }
);
