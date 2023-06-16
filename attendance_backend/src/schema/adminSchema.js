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
    required: true,
    validate: (value)=>{
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value)) {
      throw new Error(
        "Minimum eight and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      )
    }
  }
  },
  }
);
