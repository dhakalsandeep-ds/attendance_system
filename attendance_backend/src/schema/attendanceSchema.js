import { Schema } from "mongoose";

export let attendanceSchema = Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  studentId: {
    type: Schema.ObjectId,
    ref: "Student",
  },
  batchId: {
    type: Schema.ObjectId,
    ref: "Batch",
  },
});
