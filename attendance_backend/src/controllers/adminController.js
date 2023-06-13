import { HttpStatus, secretKey } from "../config/constant.js";
import { successResponse } from "../helper/sucessResponse.js";
import expressAsyncHandler from "express-async-handler";
import { Admin, Attendance, Batch, Student, Teacher } from "../schema/mode.js";
import { Types } from "mongoose";
import { generateToken, verifyToken } from "../utils/token.js";

export let addAdmin = expressAsyncHandler(async (req, res, next) => {
  let result = await Admin.create(req.body);
  console.log(result);

  let response = {
    res: res,
    message: "success",
    result: result,
    statusCode: HttpStatus.CREATED,
  };

  successResponse(response);
});
export let addBatch = expressAsyncHandler(async (req, res, next) => {
  let result = await Batch.create(req.body);
  console.log(result);

  let response = {
    res: res,
    message: "success",
    result: result,
    statusCode: HttpStatus.CREATED,
  };

  successResponse(response);
});

export let loginAdmin = expressAsyncHandler(async (req, res, next) => {
  let result = await Admin.find(req.body);

  let jwt_token;
  if (result.length === 1) {
    jwt_token = await generateToken(req.body, {
      expiresIn: "365d",
    });
  } else {
    throw new Error("password or email wrong");
  }

  let response = {
    res: res,
    message: "success",
    result: [
      {
        token: JSON.stringify(jwt_token),
      },
    ],
    statusCode: HttpStatus.CREATED,
  };

  successResponse(response);
});

export let updateUser = expressAsyncHandler(async (req, res, next) => {
  // try{

  let result = await User.findByIdAndUpdate(req.params.id, req.body);

  let response = {
    res: res,
    message: "updated",
    result: "updated",
    statusCode: HttpStatus.CREATED,
  };

  successResponse(response);

  // }catch(error){

  // let response = {
  //  "res":res,
  //  "message":error.message,
  //  "statusCode":HttpStatus.BAD_REQUEST
  // }

  // error.statusCode = HttpStatus.BAD_REQUEST
  // next(error)
  //  errorResponse(response)

  // }
});

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

// export let getTeacher = expressAsyncHandler(async (req, res, next) => {
//   // try{

//   //  let result = await User.find({name:"nitan"}) // this is exact searching
//   //  let result = await User.find({name:"nitan",age:29}) /// this is exact searching
//   //  let result = await User.find({age:{$gt:33}}) /// this is exact searching
//   //  let result = await User.find({age:{$gte:33}}) /// this is exact searching
//   //  let result = await User.find({age:{$lt:33}}) /// this is exact searching
//   //  let result = await User.find({age:{$lte:33}}) /// this is exact searching
//   //  let result = await User.find({age:{$ne:33}}) /// this is exact searching
//   //  let result = await User.find({name:{$in:["nitan"]}}) /// this is exact searching

//   //  let result = await User.find({$or:[{name:"a"},{name:"nitan"}]}) /// this is exact searching
//   //  let result = await User.find({$and:[{age:33},{name:"nitan"}]}) /// this is exact searching
//   // let result = await Teacher.find().populate({
//   // path: "batchId",
//   // match: {
//   //   course: "dot net",
//   // },
//   // }); /// this is exact searching

//   // let result = await Teacher.find({_id: 'a'}).populate({
//   //   path:"batchId",
//   //   match:{
//   //     _id:req.params
//   //   },
//   //   populate:{
//   //     path:"studentId",
//   //     match

//   //   }
//   // })

//   let result = await Teacher.find({
//     _id: "64818d8b43933fbec54ae4b0",
//   });

//   let response = {
//     res: res,
//     message: "hello",
//     result: result,
//     statusCode: HttpStatus.CREATED,
//   };

//   successResponse(response);

//   // }catch(error){

//   //   let response = {
//   //    "res":res,
//   //    "message":error.message,
//   //    "statusCode":HttpStatus.BAD_REQUEST
//   //   }

//   //  errorResponse(response)
//   //   error.statusCode = HttpStatus.BAD_REQUEST
//   //   next(error)

//   // }
// });
export let getBatch = expressAsyncHandler(async (req, res, next) => {
  let result = await Batch.find();

  let response = {
    res: res,
    message: "success",
    result: result,
    statusCode: HttpStatus.CREATED,
  };

  successResponse(response);
});

export let getTeacher = expressAsyncHandler(async (req, res, next) => {
  let result = await Teacher.find();

  let response = {
    res: res,
    message: "success",
    result: result,
    statusCode: HttpStatus.CREATED,
  };

  successResponse(response);
});

export let addTeacher = expressAsyncHandler(async (req, res, next) => {
  let result = await Teacher.create(req.body);
  console.log(result);

  let response = {
    res: res,
    message: "success",
    result: result,
    statusCode: HttpStatus.CREATED,
  };

  successResponse(response);
});

export let getStudent = expressAsyncHandler(async (req, res, next) => {
  let result = await Student.find();

  let response = {
    res: res,
    message: "success",
    result: result,
    statusCode: HttpStatus.CREATED,
  };

  successResponse(response);
});

export let addStudent = expressAsyncHandler(async (req, res, next) => {
  let result = await Student.create(req.body);
  console.log(result);

  let response = {
    res: res,
    message: "success",
    result: result,
    statusCode: HttpStatus.CREATED,
  };

  successResponse(response);
});

export const authenticateLogin = expressAsyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    const info = await verifyToken(token);

    // const exist = Admin.find()

    console.log(info);
    let response = {
      res: res,
      message: "valid token",

      statusCode: HttpStatus.CREATED,
    };

    successResponse(response);
  }
  // jwt.verify(token, secretKey, (err, user) => {
  //   if (err) {
  //     return res.sendStatus(403);
  //   }

  //   req.user = user;
  //   next();
  // });
  // } else {
  //   res.sendStatus(401);
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
