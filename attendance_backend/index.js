import express, { json } from "express";
import { connectDb } from "./src/connectdb/connectdb.js";
import { studentRouter } from "./src/Routes/studentRouter.js";
import { teacherRouter } from "./src/Routes/teacherRouter.js";
import attendanceRouter from "./src/Routes/attendanceRouter.js";
import adminRouter from "./src/Routes/adminRouter.js";
import cors from "cors";
import { errorMiddleware } from "./src/helper/errorMiddleware.js";
import { PORT } from "./src/config/constant.js";
import { helperRouter } from "./src/Routes/helperRouter.js";
import expressAsyncHandler from "express-async-handler";
import { Admin, Token } from "./src/schema/model.js";
import { generateToken } from "./src/utils/token.js";

let app = new express();
connectDb();
app.use(cors());
app.use(json());

app.use("/", helperRouter);
app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);
app.use("/attendance", attendanceRouter);
app.use("/admin", adminRouter);

app.use(express.static("./public"));
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`app is listening at port number ${PORT}`);
  console.log(`http://localhost:${PORT}/`);
});
