import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { Users } from "../model/usermodel";
import { IDecode } from "../interface";
import { IRequest } from "../interface/express";

export const auth = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.status(400).json({ message: "Invalid authentication!" });

    const decoded = jwt.verify(
      token,
      `${process.env.JWT_ACCESS_SECRET}`
    ) as IDecode;

    if (!decoded)
      return res.status(400).json({ message: "Invalid authentication!" });

    const user = await Users.findOne({ _id: decoded.id });

    if (!user) return res.status(400).json({ message: "user does not exits!" });

    req.user = user;

    console.log("authen success go to user profile update!");
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
