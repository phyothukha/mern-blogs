import { Router } from "express";
import {
  LoginController,
  RegisterController,
} from "../controller/auth.controller";

const router = Router();

const Login = router.post("/login", LoginController);
const Register = router.post("/register", RegisterController);

const authRoute = [Login, Register];

export default authRoute;
