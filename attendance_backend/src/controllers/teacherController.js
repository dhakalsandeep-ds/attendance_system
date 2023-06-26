import expressAsyncHandler from "express-async-handler";
import { Attendance, Batch, Student, Teacher, Token } from "../schema/model.js";
import { comparePassword, hashPassword } from "../utils/Hashing.js";
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
    statusCode: HttpStatus.OK,
  };

  successResponse(response);
});

export let logoutTeacher = expressAsyncHandler(async (req, res, next) => {
  let id = req.body.token.tokenId;
  await Token.findByIdAndDelete({ _id: id });
  let response = {
    res: res,
    message: "successfully logged out",
    statusCode: HttpStatus.OK,
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
    message: "All Batches",
    statusCode: HttpStatus.OK,
  };

  successResponse(response);
});

export let updatePasswordTeacher = expressAsyncHandler(async (req, res, next) => {
  let teacherId = req.body.info.id
  let theTeacher = await Teacher.findOne({ _id:teacherId})
  let currentPassword=req.body.currentPassword
  if(!await comparePassword(currentPassword,theTeacher.password))
  {
    let error = new Error("Password didn't match")
    error.statusCode=401
    throw error    
  }
  let _hashPassword= await hashPassword(req.body.newPassword)
  let result=await Teacher.findByIdAndUpdate({_id:teacherId},{password:_hashPassword})

  let response = {
    res,
    result:{id:teacherId},
    message: "Password Changed Successfully",
    statusCode: HttpStatus.OK,
  };

  successResponse(response);
});