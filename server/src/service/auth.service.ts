import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Twilio } from "twilio";
import { Response } from "express";
import { Iuser, IuserParams } from "../interface";
import {
  generateAccesstoken,
  generateRefreshtoken,
} from "../config/generatetoken";
import { Users } from "../model/usermodel";

/** sendmail */

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const CLIENT_ID = process.env.MAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN;
const SENDER_MAIL = process.env.SENDER_EMAIL_ADDRESS;

/** about this mail login with  https://console.cloud.google.com/apis/dashboard
 *  and read documentation about nodemailer  https://nodemailer.com */

export const sendEmail = async (to: string, url: string, txt: string) => {
  const oauth2Client = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    OAUTH_PLAYGROUND
  );

  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  try {
    const access_token = await oauth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_MAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: access_token,
      },
    } as SMTPTransport.Options);

    const mailOptions = {
      from: SENDER_MAIL,
      to: to,
      subject: "mern-stack-blog",
      html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the PHYROUS-DEV.</h2>
        <p>Congratulations! You're almost set to start using mern stack developer.
            Just click the button below to validate your email address.
        </p>
        
        <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
    
        <p>If the button doesn't work for any reason, you can also click on the link below:</p>
    
        <div>${url}</div>
        </div>
        `,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.log("your got an error!", err);
  }
};

/**send sms*/

/** if you want to read about this twilio
 *
 * go to this https://www.twilio.com/docs/messaging/quickstart
 *
 * twilio is not support in myanmar if you get err code 60605
 * go to https://console.twilio.com/us1/develop/verify/settings/geopermissions
 * and search your country verify
 */

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_PHONE_NUMBER;
const serviceId = process.env.TWILIO_SERVICE_SID;

const client = new Twilio(accountSid, authToken);
export const sendSMS = (to: string, body: string, txt: string) => {
  try {
    client.messages
      .create({
        body: `PHYROUS-DEV ${txt} - ${body}`,
        from,
        to,
      })
      .then((message) => console.log(message.sid));
  } catch (err) {
    console.log("you got an error!", err);
  }
};
export const smsOTP = async (to: string, channel: string) => {
  try {
    const data = await client.verify.v2
      .services(serviceId)
      .verifications.create({ to, channel });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const verifysms = async (to: string, code: string) => {
  try {
    const data = await client.verify.v2
      .services(serviceId)
      .verificationChecks.create({ to, code });
    return data;
  } catch (err) {
    const errMsg =
      err.status === 404 ? "your otp code is expired!" : err.message;
    console.log(errMsg);
  }
};

/** login or register  */

export const LoginUser = async (
  user: Iuser,
  password: string,
  res: Response
) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const errMsg =
      user.type === "register"
        ? "Password is incorrect"
        : `password is incorrect this account is Login with ${user.type}`;

    return res.status(400).json({ message: errMsg });
  }
  /** when your account is loginned!. permison token you can get  */

  const access_token = generateAccesstoken({ id: user._id });
  const refresh_token = generateRefreshtoken({ id: user._id });

  /** this permission login can send as http only cookie to refresh token route! */

  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: "/api/refresh_token",
    maxAge: 30 * 24 * 60 * 60 * 1000 /**day-30*/,
  });

  return res.status(200).json({
    message: "Login Success!",
    access_token,
    user: { ...user._doc, password: "" },
  });
};

export const registerUser = async (user: IuserParams, res: Response) => {
  const newUser = new Users(user);
  await newUser.save();

  const access_token = generateAccesstoken({ id: newUser._id });
  const refresh_token = generateRefreshtoken({ id: newUser._id });

  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,

    path: "/api/refresh_token",
    maxAge: 30 * 24 * 60 * 60 * 1000, //day-30
  });

  return res.status(200).json({
    message: "Login Success!",
    access_token,
    user: { ...newUser._doc, password: "" },
  });
};
