import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { IRequest } from "../interface/express";
import { Users } from "../model/usermodel";

/** you can change your account photo and name  */
const updateUserController = async (req: IRequest, res: Response) => {
  try {
    const { avatar, name } = req.body;
    console.log({ avatar, name });

    await Users.findOneAndUpdate({ _id: req.user._id }, { avatar, name });

    return res.status(200).json({ message: "user updated successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
/** you can change your password ! */

const resetPasswordController = async (req: IRequest, res: Response) => {
  if (!req.user)
    return res.status(400).json({ message: "Invalid Authentication!" });

  if (req.user.type !== "register")
    return res.status(400).json({
      message: `you can't change your password in ${req.user.type} type login!`,
    });

  try {
    const { password } = req.body;
    const hashpassword = await bcrypt.hash(password, 12);

    await Users.findOneAndUpdate(
      { _id: req.user._id },
      {
        password: hashpassword,
      }
    );
    return res.status(200).json({ message: "reset password successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUserController = async (req: Request, res: Response) => {
  try {
    const user = await Users.findById(req.params.id).select("-password");
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const userController = {
  updateUserController,
  resetPasswordController,
  getUserController,
};
