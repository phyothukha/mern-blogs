import { userController } from "./../controller/user.controller";
import { authentication } from "../middleware/auth";
import { Router } from "express";

const router = Router();

const updateUser = router.patch(
  "/update-user",
  authentication,
  userController.updateUserController
);
const resetpassword = router.patch(
  "/reset-password",
  authentication,
  userController.resetPasswordController
);

const getUser = router.get("/get-user/:id", userController.getUserController);

const userRoutes = [updateUser, resetpassword, getUser];

export default userRoutes;
