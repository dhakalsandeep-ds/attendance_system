import express, { json } from "express";
import { connectDb } from "./src/connectdb/connectdb.js";
import { studentRouter } from "./src/Routes/studentRouter.js";
import { teacherRouter } from "./src/Routes/teacherRouter.js";
import attendanceRouter from "./src/Routes/attendanceRouter.js";
import adminRouter from "./src/Routes/adminRouter.js";
import cors from "cors";
import { TokenVerification } from "./src/middleware/TokenValidation.js";
import { errorMiddleware } from "./src/helper/errorMiddleware.js";
import { dateNow } from "./src/utils/Date.js";
import { Admin } from "./src/schema/model.js";

import sign from "jwt-encode";

const corsOptions = {
  origin: "*",
  // credentials: true, //access-control-allow-credentials:true
  // optionSuccessStatus: 200,
};

let app = new express();

let port = 8000;
app.use(cors(corsOptions));
app.use(json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/setOwnIDDataByLoginId", async (req, res) => {
  // const email = req.body.loginId; //The unique id of a user in your database, usually email or phone
  // const ownIdData = req.body.ownIdData; //OwnID authentication information as string
  // console.log(ownIdData, "..............jljljl");
  // console.log(email, "email.................");
  // console.log("request body", req.body);
  // const user = await Admin.findOne({ email: email });
  // console.log(user, "user................");
  // user.ownIdData = ownIdData;
  // await user.save();
  console.log("calling.....", req.body);
  return res.sendStatus(204);
});

app.post("/getOwnIDDataByLoginId", async (req, res) => {
  const email = req.body.loginId; //The unique id of a user in your database, usually email or phone
  const user = await Admin.findOne({ email: email }).exec();
  if (!user) {
    return res.json({ errorCode: 404 });
  } //Error code when user doesn't exist
  res.json({ ownIdData: user.ownIdData }); //OwnID authentication information as string
});

app.post("/getSessionByLoginId", async (req, res) => {
  const email = req.body.loginId; //The unique id of a user in your database, usually email or phone
  const user = await Admin.findOne({ email: email }).exec();
  const jwt = sign({ email: user.email }, "secret");
  return res.json({ token: jwt });
});

app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);
app.use("/attendance", attendanceRouter);
app.use("/admin", adminRouter);
app.get("/verifyToken", TokenVerification);
app.use(express.static("./public"));
app.use(errorMiddleware);
connectDb();

app.listen(port, () => {
  console.log(`app is listening at port number ${port}`);
  console.log(`http://localhost:${port}/`);
});
