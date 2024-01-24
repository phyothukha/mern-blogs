import mongoose, { Schema } from "mongoose";
import { IComment } from "../interface";

const commentSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    blog_id: mongoose.Types.ObjectId,
    blog_user_id: mongoose.Types.ObjectId,
    content: {
      type: String,
      required: true,
    },
    replyCM: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comment",
      },
    ],
    reply_user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    comment_root: {
      type: mongoose.Types.ObjectId,
      ref: "comment",
    },
  },
  {
    timestamps: true,
  }
);

export const Comments = mongoose.model<IComment>("comment", commentSchema);
