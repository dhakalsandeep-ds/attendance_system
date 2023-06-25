import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
export let connectDb = expressAsyncHandler(async () => {
  let port = "mongodb://127.0.0.1:27017/attendance_sy";
    await mongoose.connect(port);
    console.log(`expressApp is connected to mongodb  at port ${port}`);
})
