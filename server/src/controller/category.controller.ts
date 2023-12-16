import { Response, Request } from "express";
import { IRequest } from "../interface/express";
import { Categories } from "../model/categorymodel";

const createCategory = async (req: IRequest, res: Response) => {
  if (!req.user)
    return res.status(400).json({ message: "Invalid Authentication!" });

  if (req.user.role !== "admin")
    return res.status(400).json({ message: "invalid Authentication!" });

  try {
    const name = req.body.name.toLowerCase();

    const newCategory = new Categories({ name });
    await newCategory.save();

    return res
      .status(200)
      .json({ message: "created successfully!", newCategory });
  } catch (err) {
    let errMsg;
    if (err.code === 11000) {
      errMsg = Object.values(err.keyValue)[0] + " alredy exits!";
    } else {
      const name = Object.keys(err.errors)[0];
      errMsg = err.errors[`${name}`].message;
    }

    return res.status(500).json({ message: errMsg });
  }
};

const getCategory = async (req: IRequest, res: Response) => {
  try {
    /** to reverse sorting using minus in createAt */
    const Category = await Categories.find().sort("-createdAt");

    return res.status(200).json({ Category });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    await Categories.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.name }
    );

    return res.status(200).json({ message: "updated successfully!" });
  } catch (err) {
    let errMsg;
    if (err.code === 11000) {
      errMsg = Object.values(err.keyValue)[0] + " alredy exits!";
    } else {
      const name = Object.keys(err.errors)[0];
      errMsg = err.errors[`${name}`].message;
    }
    return res.status(500).json({ message: errMsg });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    await Categories.findOneAndDelete({
      _id: req.params.id,
    });

    return res.status(200).json({ message: "deleted successfully!" });
  } catch (err) {
    return res.status(200).json({ message: err.message });
  }
};

export const categoryController = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
