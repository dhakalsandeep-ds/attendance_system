import { Schema, Types } from "mongoose";

export let teacherSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: (value) => {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
        throw new Error("email is Invalid.");
    }
  },
  password: {
    type: String,
    required: true,
    validate: (value) => {
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/.test(value))
        throw new Error("Password must be:- Minimum eight characters long at least one uppercase letter and one lowercase letter One number and one special character");
      }
  },
  batchId: {
    type: [Types.ObjectId],
    ref: "Batch",
  },
});
