import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { Users } from "../model/usermodel";
import { IDecode } from "../interface";
import { IRequest } from "../interface/express";

export const authentication = async (
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

    /** all done pass through next function */
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const AdminPersmission = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user)
      return res.status(400).json({ message: "invalid authentication!" });

    if (req.user.role !== "admin")
      return res.status(400).json({ message: "invalid user Authentication!" });

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
