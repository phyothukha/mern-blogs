import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "../model/usermodel";
import { validateEmail, validatephone } from "../middleware/valid";
import { IDecode } from "../interface";
import { LoginUser, sendEmail, sendSMS } from "../service/auth.service";
import {
  generateAccesstoken,
  generateActivetoken,
} from "../config/generatetoken";

const CLIENT_URL = process.env.BASE_URL;

export const RegisterController = async (req: Request, res: Response) => {
  try {
    const { account, name, password } = req.body;

    const exitAccount = await Users.findOne({ account });
    if (exitAccount) {
      return res
        .status(400)
        .json({ message: "your account is already exits!" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = { name, account, password: hashedpassword };

    const activeToken = generateActivetoken({ newUser });
    const url = `${CLIENT_URL}/active/${activeToken}`;
    if (validateEmail(account)) {
      sendEmail(account, url, "verify your email address!");
      return res.json({ message: "Success!,Please check your email!" });
    } else if (validatephone(account)) {
      sendSMS(account, url, "verify your phone number!");
      return res.json({ message: "Success!,Please check your phone" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const ActiveAccountController = async (req: Request, res: Response) => {
  try {
    const { activeToken } = req.body;

    const decoded = jwt.verify(
      activeToken,
      `${process.env.JWT_ACTIVE_SECRET}`
    ) as IDecode;
    const { newUser } = decoded;
    if (!newUser)
      return res.status(400).json({ message: "Invalid Authentication!" });

    const user = new Users(newUser);
    await user.save();

    res.status(201).json({ message: "your account is activated!" });
  } catch (err) {
    let errmsg;
    if (err.code === 11000) {
      errmsg = Object.keys(err.keyValue)[0] + " already exists!";
    } else {
      errmsg = err.message;
    }
    return res.status(500).json({ message: errmsg });
  }
};

export const LoginController = async (req: Request, res: Response) => {
  try {
    const { account, password } = req.body;
    const user = await Users.findOne({ account });
    if (!user) {
      return res.status(400).json({ message: " your account does not exits!" });
    }

    LoginUser(user, password, res);
  } catch (err) {
    return res.status(500).json({ message: "you get an error in login route" });
  }
};

export const LogoutController = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
    return res.json({ message: "Logged out!" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: " you get an errro in logout route!" });
  }
};

export const RefreshController = async (req: Request, res: Response) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token)
      return res
        .status(400)
        .json({ message: "Please Login now!............." });
    const decoded = jwt.verify(
      rf_token,
      `${process.env.JWT_REFRESH_SECRET}`
    ) as IDecode;
    if (!decoded) return res.status(400).json({ message: "Please Login now!" });

    const user = await Users.findById(decoded.id).select("-password");
    if (!user)
      return res.status(400).json({ message: "This account does not exists" });
    const access_token = generateAccesstoken({ id: user._id });
    return res.status(200).json({ access_token });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "you get an err in refresh route!" });
  }
};
