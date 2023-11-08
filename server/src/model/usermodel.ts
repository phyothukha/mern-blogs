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
    account: {
      type: String,
      require: [true, "your email or phone number is required!"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: [true, "please add your password!"],
      minlength: [6, "Password must be at least 6 chars!"],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
    role: {
      type: String,
      default: "user", //admin
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
