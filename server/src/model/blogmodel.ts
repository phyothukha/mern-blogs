import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      trim: true,
      required: true,
      minLength: 20,
      maxLength: 50,
    },
    content: {
      type: String,
      required: true,
      minLength: 2000,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      minLength: 50,
      maxLength: 200,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
  },
  {
    timestamps: true,
  }
);

export const Blogs = mongoose.model("blog", blogSchema);
