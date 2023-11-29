import { IGooglePayload } from "./../interface/index";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "../model/usermodel";
import { validateEmail, validatephone } from "../middleware/valid";
import { IDecode } from "../interface";
import {
  LoginUser,
  registerUser,
  sendEmail,
  sendSMS,
  smsOTP,
  verifysms,
} from "../service/auth.service";
import {
  generateAccesstoken,
  generateActivetoken,
} from "../config/generatetoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`);

const clientUrl = process.env.CLIENT_URL;

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
    const url = `${clientUrl}/active?active_token=${activeToken}`;
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
    console.log(activeToken);

    const decoded = jwt.verify(
      activeToken,
      `${process.env.JWT_ACTIVE_SECRET}`
    ) as IDecode;
    const { newUser } = decoded;
    if (!newUser)
      return res.status(400).json({ message: "Invalid Authentication!" });
    console.log(newUser);
    const user = await Users.findOne({ account: newUser.account });
    if (user) {
      return res
        .status(400)
        .json({ message: "your account is already registered!" });
    }
    const new_user = new Users(newUser);

    await new_user.save();

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
    return res.status(500).json({ message: err.message });
  }
};

export const LogoutController = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
    return res.json({ message: "Logged out!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const RefreshController = async (req: Request, res: Response) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token)
      return res.status(400).json({ message: "Please Login now!" });
    const decoded = jwt.verify(
      rf_token,
      `${process.env.JWT_REFRESH_SECRET}`
    ) as IDecode;
    if (!decoded) return res.status(400).json({ message: "Please Login now!" });

    const user = await Users.findById(decoded.id).select("-password");
    if (!user)
      return res.status(400).json({ message: "This account does not exists" });
    const access_token = generateAccesstoken({ id: user._id });
    return res.status(200).json({ access_token, user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const GoogleLoginController = async (req: Request, res: Response) => {
  try {
    const { id_token } = req.body;
    const verify = await client.verifyIdToken({
      idToken: id_token,
      audience: `${process.env.MAIL_CLIENT_ID}`,
    });
    const { email, email_verified, name, picture } =
      verify.getPayload() as IGooglePayload;
    if (!email_verified) {
      return res.status(500).json({ message: "Email verification failed!" });
    }

    const password = email + "your google secret password!";
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await Users.findOne({ account: email });

    if (user) {
      LoginUser(user, password, res);
    } else {
      const user = {
        name,
        account: email,
        password: passwordHash,
        avatar: picture,
        type: "login",
      };

      registerUser(user, res);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const FacebookLoginController = async (req: Request, res: Response) => {
  try {
    const { accessToken, userID } = req.body;

    const URL = `https://graph.facebook.com/${userID}?fields=id,name,email,picture&access_token=${accessToken}`;

    const data = await fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
    const { email, name } = data;
    const password = email + "your facbook secret password!";
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await Users.findOne({ account: email });

    if (user) {
      LoginUser(user, password, res);
    } else {
      const user = {
        name,
        account: email,
        password: passwordHash,
        avatar:
          "https://scontent.frgn7-2.fna.fbcdn.net/v/t39.30808-1/242490108_615864756487001_2200401206045006686_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zZN_VR2inQgAX-e7Mkl&_nc_ht=scontent.frgn7-2.fna&oh=00_AfC_Coui3mJa4tJfdO8g79Z9P1nGVNN0VAdY2tuQAOrmkQ&oe=6564A357",
        type: "login",
      };

      registerUser(user, res);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const LoginSMSController = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;
    console.log(phone);
    if (!phone) {
      return res.status(400).json({ message: "phone number is required!" });
    }

    const data = await smsOTP(phone, "sms");
    console.log(data);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const SmsVerifyController = async (req: Request, res: Response) => {
  try {
    const { phone, code } = req.body;
    console.log(phone, code);

    const data = await verifysms(phone, code);
    if (!data.valid)
      return res.status(400).json({ message: "invalid authentication!" });
    const password = phone + "your phone secret";
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await Users.findOne({ account: phone });

    if (user) {
      LoginUser(user, password, res);
    } else {
      const user = {
        name: phone,
        account: phone,
        password: passwordHash,
        type: "login",
      };
      registerUser(user, res);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
