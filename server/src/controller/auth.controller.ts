import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "../model/usermodel";

export const RegisterController = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(401)
        .json({ message: "your email and password and name is required!" });
    }
    const exitemail = await Users.findOne({ email });
    if (exitemail) {
      return res.status(400).json({ message: "your email is already exits!" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      name,
      email,
      password: hashedpassword,
    });

    if (user) {
      return res.status(200).json({ user });
    }

    return res.status(200).json({ message: "you are in register router" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "you get an error in register route!" });
  }
};
export const LoginController = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    console.log({ password, email });
    if (!password || !email) {
      return res
        .status(401)
        .json({ message: "your email and password is requires" });
    }
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "your account does not exist!" });
    }
    if (!bcrypt.compare(password, user.password)) {
      const message =
        user.type === "register"
          ? "password is incorrect"
          : `password is incorrect.This account login is ${user.type}`;
      return res.status(400).json({ message });
    }
    const accesstoken = jwt.sign({ user }, process.env.JWT_ACCESS_SECRET);
    console.log({ accesstoken });

    // console.log({ user });

    res.status(200).json({ message: " you are in login router" });
  } catch (err) {
    return res.status(500).json({ message: "you are in error!" });
  }
};
