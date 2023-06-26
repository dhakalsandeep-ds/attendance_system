import { Schema } from "mongoose";

export let attendanceSchema = Schema({
  date: {
    type: Date,
    immutable:true,
    default: Date.now
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
  }
});
