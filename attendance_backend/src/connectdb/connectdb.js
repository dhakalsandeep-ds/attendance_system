import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { MONGO_URL } from "../config/constant.js";
export let connectDb = expressAsyncHandler(async () => {
    await mongoose.connect(MONGO_URL)
    console.log(`expressApp is connected to mongodb`)
})
