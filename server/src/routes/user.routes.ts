import { userController } from "./../controller/user.controller";
import { Router } from "express";
import { auth } from "../middleware/auth";

const router = Router();

const updateUser = router.patch(
  "/update-user",
  auth,
  userController.updateUserController
);
const resetpassword = router.patch(
  "/reset-password",
  auth,
  userController.resetPasswordController
);

const userRoutes = [updateUser, resetpassword];

export default userRoutes;
