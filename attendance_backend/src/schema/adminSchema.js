import { Schema } from "mongoose";

export let adminSchema = Schema({
  email: {
    type: String,
    unique:true,
    required: true,
    validate: (value) => {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
        throw new Error("email is Invalid.");
    }
  },
  password: {
    type: String,
    required: true
  },
  }
);
