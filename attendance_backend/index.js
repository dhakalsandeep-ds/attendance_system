import express, { json } from "express";
import { connectDb } from "./src/connectdb/connectdb.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import {studentRouter} from "./src/Routes/studentRouter.js";
import {teacherRouter} from "./src/Routes/teacherRouter.js";
import attendanceRouter from "./src/Routes/attendanceRouter.js";
import adminRouter from "./src/Routes/adminRouter.js";
import cors from "cors";
import { TokenVerification } from "./src/middleware/TokenValidation.js";


let app = express();

let port = 8000;

app.use(cors());

app.use(json());

connectDb();

app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);
app.use("/attendance", attendanceRouter);
app.use("/admin", adminRouter);
app.get("/verifyToken",TokenVerification);



app.use(express.static("./public"));

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`app is listening at port number ${port}`);
  console.log(`http://localhost:${port}/`);
});
