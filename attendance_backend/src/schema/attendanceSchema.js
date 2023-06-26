import { Schema } from "mongoose";
import { dateNow } from "../utils/Date.js";

export let attendanceSchema = Schema({
  date: {
    type: Date,
    immutable:true,
    default: dateNow()
  },
  status:{
    type:Number,
    required:true,
    enum:[0,1,2],
    default: 0
  },
  studentId: {
    type: Schema.ObjectId,
    ref: "Student"
  },
  batchId: {
    type: Schema.ObjectId,
    ref: "Batch"
  },
  year:{
    type:Number
  },
  month:{
    type:Number
  }
});
