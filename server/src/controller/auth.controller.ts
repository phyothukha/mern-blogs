import { Request, Response } from "express";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import { Users } from "../model/usermodel";

export const RegisterController = async (req: Request, res: Response) => {
  try {
    const { account, name, password } = req.body;
    if (!name || !account || !password) {
      return res
        .status(401)
        .json({ message: "your email and password and name is required!" });
    }
    const exitAccount = await Users.findOne({ account });
    if (exitAccount) {
      return res
        .status(400)
        .json({ message: "your account is already exits!" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = new Users({ name, account, password: hashedpassword });
    return res
      .status(201)
      .json({ message: "register successfully", data: newUser });

    // return res.status(200).json({ message: "you are in register router" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "you get an error in register route!" });
  }
};

// export const LoginController = async (req: Request, res: Response) => {
//   try {
//     const { password, email } = req.body;

//     console.log({ password, email });
//     if (!password || !email) {
//       return res
//         .status(401)
//         .json({ message: "your email and password is required" });
//     }
//     const user = await Users.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "your account does not exist!" });
//     }

//     if (!bcrypt.compare(password, user.password)) {
//       const message =
//         user.type === "register"
//           ? "password is incorrect"
//           : `password is incorrect.This account login is ${user.type}`;
//       return res.status(400).json({ message });
//     }
//     const accesstoken = jwt.sign({ user }, process.env.JWT_ACCESS_SECRET);
//     return res
//       .status(200)
//       .json({ message: "Login successful!", accesstoken, user });

//     // res.status(200).json({ message: " you are in login router" });
//   } catch (err: any) {
//     return res.status(500).json({ message: err.message });
//   }
// };
