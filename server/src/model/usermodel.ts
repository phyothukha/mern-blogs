import mongoose, { Schema } from "mongoose";
import { Iuser } from "../interface";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "Please Add your name!"],
      trim: true,
      maxLength: [20, "your name must be less than 20!"],
    },
    email: {
      type: String,
      require: [true, "your email is required!"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: [true, "please add your password!"],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
    role: {
      type: String,
      default: "user",
    },
    type: {
      type: String,
      default: "register", // login
    },
    rf_token: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Users = mongoose.model<Iuser>("user", UserSchema);
