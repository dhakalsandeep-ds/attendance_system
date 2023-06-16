import expressAsyncHandler from "express-async-handler";
import { Student } from "../schema/model.js";
import { successResponse } from "../helper/successResponse.js";
import { HttpStatus } from "../config/constant.js";

export let loginStudent=expressAsyncHandler(async(req,res,next)=>{
  let email=req.body.email
  let password=req.body.password
  let result = await Student.findOne({email});
  let jwt_token;
  if (await comparePassword(password,result.password)){
    let infoObj={
      id:result._id,
      role:"student"
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
