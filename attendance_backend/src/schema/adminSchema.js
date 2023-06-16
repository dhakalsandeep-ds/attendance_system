import { Schema } from "mongoose";

export let adminSchema = Schema({
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
      if (!/^(.{8,})$/.test(value)){
        throw new Error("Password must be:- Minimum eight characters, at least one upper and one lower letter and one number:");
    }
  }
  },
});
