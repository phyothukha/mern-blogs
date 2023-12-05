import { Router } from "express";
import { validateRegister } from "../middleware/valid";
import { authController } from "../controller/auth.controller";

const router = Router();

const Register = router.post(
  "/register",
  validateRegister,
  authController.RegisterController
);
const Active = router.post(
  "/active-account",
  authController.ActiveAccountController
);
const Login = router.post("/login", authController.LoginController);
const Logout = router.get("/logout", authController.LogoutController);
const RefreshToken = router.get(
  "/refresh_token",
  authController.RefreshController
);
const GoogleLogin = router.post(
  "/google_login",
  authController.GoogleLoginController
);
const FacebookLogin = router.post(
  "/facebook_login",
  authController.FacebookLoginController
);
const LoginSMS = router.post("/login_sms", authController.LoginSMSController);
const SMSVerify = router.post(
  "/sms_verify",
  authController.SmsVerifyController
);

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
