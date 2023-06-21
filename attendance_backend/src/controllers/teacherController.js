import expressAsyncHandler from "express-async-handler"
import { Batch, Teacher, Token } from "../schema/model.js";
import { comparePassword } from "../utils/Hashing.js";
import { generateToken } from "../utils/token.js";
import { HttpStatus } from "../config/constant.js";
import { successResponse } from "../helper/successResponse.js";

export let loginTeacher=expressAsyncHandler(async(req,res,next)=>{
  let email=req.body.email
  let password=req.body.password
  let result = await Teacher.findOne({email});
  let jwt_token;
  if (await comparePassword(password,result.password)){
    let infoObj={
      id:result._id,
      role:"teacher"
    }
    let expireInfo={
      expiresIn:"365d"
    }
    jwt_token = await generateToken(infoObj, expireInfo);
    await Token.create({token:jwt_token})
  }
    else{
    let error= new Error("Credential didn't match")
    error.statusCode=401
    throw error
    }

  let response = {
    res: res,
    message: "success",
    result: 
      {
        token:jwt_token,
      },
    statusCode: HttpStatus.CREATED,
  };

  successResponse(response);
})

export let logoutTeacher = expressAsyncHandler(async(req,res,next)=>{
  let id=req.body.token.tokenId
  await Token.findByIdAndDelete({_id:id})
  let response = {
    res: res,
    message: "successfully logged out",
    statusCode: HttpStatus.CREATED,
  };

  successResponse(response);

})

export let showAllBatch=expressAsyncHandler(async(req,res,next)=>{
  let teacherId=req.body.info.id
  let teacher=await Teacher.findOne({_id:teacherId})
  let numberOfBatch=teacher.batchId.length
  console.log(numberOfBatch)
  // let batch=await Batch.find({_id:})
  // console.log("teacherid"+teacher)
  // console.log("classes+++++++++++"+batch)
})