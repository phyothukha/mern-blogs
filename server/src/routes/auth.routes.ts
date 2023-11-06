import { Router } from "express";
import {
  // LoginController,
  RegisterController,
} from "../controller/auth.controller";
import { validateRegister } from "../middleware/valid";

const router = Router();

const Register = router.post("/register", validateRegister, RegisterController);
// const Login = router.post("/login", LoginController);

const authRoute = [Register];

export default authRoute;
