import express, { json } from "express";
import { connectDb } from "./src/connectdb/connectdb.js";

import { errorMiddleware } from "./middleware/errorMiddleware.js";

import studentRouter from "./src/Routes/studentRoute.js";
import teacherRouter from "./src/Routes/teacherRoute.js";
import attendanceRouter from "./src/Routes/attendanceRouter.js";
import adminRouter from "./src/Routes/adminRouter.js";
import cors from "cors";

let app = express();

let port = 8000;

app.use(cors());

app.use(json());

// localhost:8000/products  , method get

// m1a | m2a | m3r | m4a | m5e;

// app.use(
//   (req, res, next) => {
//     console.log(" i am first");
//     next();
//   },
//   (req, res, next) => {
//     console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
//     next();
//   }
// );

// app.use((req, res, next) => {
//   console.log("i am second");
//   next();
// });

// app.use("/a/b", firstRouter);
// app.use("/products", productRouter);
// app.use("/users", userRouter);
// app.use("/contact", ContactRouter);
// app.use("/review", reviewRouter);

// app.use("/files", fileRouter);

app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);
app.use("/attendance", attendanceRouter);
app.use("/admin", adminRouter);

app.use(express.static("./public"));

// app.use((req, res, next) => {
//   console.log("i am fourth");
// });

// app.use((err, req, res, next) => {
//   console.log("i am error middleware");
//   res.json("error has occurred");

//   next("rrr");
// });

// app.use((err, req, res, next) => {
//   console.log("i am second error middleware");
// });

//  let hashPassword = expressAsyncHandler(async (password)=>{
//      let hashedPassword = await bcrypt.hash(password,10);
//      return hashedPassword
//  })

// let _hashPassword = await hashPassword("nitan123")
// console.log(_hashPassword)

// let comparePassword = expressAsyncHandler(async (password,hashPassword)=>{
//   let isMatch = await bcrypt.compare(password,hashPassword)

//   return isMatch
// })

// let _isMatch = await comparePassword("nitan123","$2b$10$otvbzWQZk5cFEM9BLCi.EecvcYur.QsXN.nf0q2INBrrbWwvXEVme")

// console.log(_isMatch)

// let infoObj = {
//   "Id":"1"
// };
// let secretKey = "dw3secretkey";
// let expiresInfo =
// {
//   expiresIn: "365d",
// };
// let generateToken = async (infoObj, secretKey, expiresInfo) => {
//   let token = await jwt.sign(infoObj, secretKey, { expiresIn: "1h" });
//   console.log(token);
// };
// let _token = await generateToken(infoObj, secretKey, expiresInfo);

//  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjEiLCJpYXQiOjE2ODU0NDA1MjcsImV4cCI6MTY4NTQ0NDEyN30.-j_IZ_2Cag4ws3dRMs-xV1bJ_jnEBOP8VZhfctfky5U"

//  let _infoObj = await jwt.verify(token,"dw3secretkey")

//  console.log(_infoObj)

let createUser = async () => {
  let data = { name: "nitan", age: 29, isMarried: false };
  try {
    let result = await First.create(data);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
};
let readUser = async () => {
  try {
    let result = await First.find();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
};
let updateUser = async () => {
  let data = { name: "nitan", age: 29, isMarried: false };

  try {
    let result = await First.find();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
};

connectDb();

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
  console.log(`http://localhost:${port}/`);
});
