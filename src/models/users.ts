import { Schema, model } from "mongoose";
import UserType from "../interfaces/usertype";

const userSchema = new Schema<UserType>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    mobileNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    emailVerifed: {
      type: Boolean,
      required: true,
      default: false,
    },

    verificationCode: {
      type: String,
      select: true,
    },

    refreshtoken: {
      type: String,
      index: true,
    },
  },
  { timestamps: true }
);

const User = model("user", userSchema);
export default User;
