import { Schema } from "mongoose";

export let adminSchema = Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: (value) => {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
        throw new Error("email is Invalid.");
    },
  },
  password: {
    type: String,
    // required: true,
    // validate: (value) => {
    //   if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value))
    //     throw new Error(
    //       "Password must contain:- 8 characters,one uppercase,one lowercase, one digit"
    //     );
    // },
  },
  ownIdData: {
    type: String,
  },
});
