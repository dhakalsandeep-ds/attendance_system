import mongoose from "mongoose";
export let connectDb = async () => {
  let port = "mongodb://127.0.0.1:27017/attendance_sy";

  try {
    await mongoose.connect(port);
    console.log(`expressApp is connected to mongodb  at port ${port}`);
  } catch (error) {
    console.log(error.message);
  }
};
