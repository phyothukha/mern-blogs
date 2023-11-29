import { Router } from "express";
import {
  ActiveAccountController,
  FacebookLoginController,
  GoogleLoginController,
  LoginController,
  LoginSMSController,
  LogoutController,
  RefreshController,
  RegisterController,
  SmsVerifyController,
} from "../controller/auth.controller";
import { validateRegister } from "../middleware/valid";

const router = Router();

const Register = router.post("/register", validateRegister, RegisterController);
const Active = router.post("/active-account", ActiveAccountController);
const Login = router.post("/login", LoginController);
const Logout = router.get("/logout", LogoutController);
const RefreshToken = router.get("/refresh_token", RefreshController);
const GoogleLogin = router.post("/google_login", GoogleLoginController);
const FacebookLogin = router.post("/facebook_login", FacebookLoginController);
const LoginSMS = router.post("/login_sms", LoginSMSController);
const SMSVerify = router.post("/sms_verify", SmsVerifyController);

const authRoute = [
  Register,
  Active,
  Login,
  Logout,
  RefreshToken,
  GoogleLogin,
  FacebookLogin,
  LoginSMS,
  SMSVerify,
];

export default authRoute;
