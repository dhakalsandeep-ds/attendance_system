import { HttpStatus } from "../config/constant.js";

import { successResponse } from "../helper/sucessResponse.js";

import expressAsyncHandler from "express-async-handler";
import { Attendance, Teacher } from "../schema/mode.js";
import { Types } from "mongoose";

// res.status(HttpStatus.CREATED).json({
//  success:true,
//  message:"user created sucessfuluy.",
//  data:result
// })

//    export let successResponse = ({res,message,result,statusCode})=>{
//       res.status(statusCode).json({
//           success:true,
//           message,
//           result,
//       })
//   }

//   res.status(HttpStatus.BAD_REQUEST).json({
//      success:false,
//      message:error.message,
//   })

// export let createUser = expressAsyncHandler(async(req,res,next)=>{

//   // console.log(req.body)

//   // let error = new Error("this is error")
//   // error.statusCode = 500

//   // next(error)

// //  try{

//     let result = await User.create(req.body)
//     console.log(result)

// let response = {"res":res,"message":"hello","result":result,"statusCode":HttpStatus.CREATED}

//  successResponse(response)

// // }catch(error){
//   //  let response = {
//   //   "res":res,
//   //   "message":error.message,
//   //   "statusCode":HttpStatus.BAD_REQUEST
//   //  }

//   // error.StatusCode = HttpStatus.BAD_REQUEST

//   // next(error)

// // }

// })

// export let updateUser = expressAsyncHandler(async(req,res,next)=>{

//   // try{

//      let result = await User.findByIdAndUpdate(req.params.id,req.body)

// let response = {"res":res,"message":"updated","result":"updated","statusCode":HttpStatus.CREATED}

//   successResponse(response)

// // }catch(error){

//     // let response = {
//     //  "res":res,
//     //  "message":error.message,
//     //  "statusCode":HttpStatus.BAD_REQUEST
//     // }

//     // error.statusCode = HttpStatus.BAD_REQUEST
//     // next(error)
//   //  errorResponse(response)

// // }

// })

// export let deleteUser = expressAsyncHandler(async(req,res,next)=>{

//   // try{

//      let result = await User.findByIdAndDelete(req.params.id)

// let response = {"res":res,"message":"deleted","result":"deleted","statusCode":HttpStatus.CREATED}

//   successResponse(response)

// // }catch(error){

//   //   let response = {
//   //    "res":res,
//   //    "message":error.message,
//   //    "statusCode":HttpStatus.BAD_REQUEST
//   //   }

//   //  errorResponse(response)

// //   error.statusCode = HttpStatus.BAD_REQUEST
// //   next(error)

// // }

// })

export let getTeacher = expressAsyncHandler(async (req, res, next) => {
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
  // let result = await Teacher.find().populate({
  // path: "batchId",
  // match: {
  //   course: "dot net",
  // },
  // }); /// this is exact searching

  // let result = await Teacher.find({_id: 'a'}).populate({
  //   path:"batchId",
  //   match:{
  //     _id:req.params
  //   },
  //   populate:{
  //     path:"studentId",
  //     match

  //   }
  // })

  let result = await Teacher.find({
    _id: "64818d8b43933fbec54ae4b0",
  });

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

// export let readDetailUser = expressAsyncHandler(async(req,res)=>{

//   // try{

//      let result = await User.findById(req.params.id)
//      console.log(result)

// let response = {"res":res,"message":"hello","result":result,"statusCode":HttpStatus.CREATED}

//   successResponse(response)

// // }catch(error){

//   //   let response = {
//   //    "res":res,
//   //    "message":error.message,
//   //    "statusCode":HttpStatus.BAD_REQUEST
//   //   }

//   //  errorResponse(response)

// //   error.statusCode = HttpStatus.BAD_REQUEST

// //   next(error)

// // }

// })
