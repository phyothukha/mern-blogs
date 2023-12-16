import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "Please add your category"],
      trim: true,
      unique: true,
      maxLength: [50, "Name is up to 50 chars long!"],
    },
  },
  {
    timestamps: true,
  }
);

export const Categories = mongoose.model("category", CategorySchema);
