import { Schema, Types } from "mongoose";

export let teacherSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
    validate: (value) => {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
        throw new Error("email is Invalid.");
    }
  },
  password: {
    type: String,
    required: true,
    validate:value=>{
      if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value))
      throw new Error("Password must contain:- 8 characters,one uppercase,one lowercase, one digit")
        }
  },
  batchId: {
    type: [Types.ObjectId],
    ref: "Batch"
  }
});
