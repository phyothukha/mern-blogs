import { Response } from "express";
import bcrypt from "bcrypt";
import { IRequest } from "../interface/express";
import { Users } from "../model/usermodel";

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

const resetPasswordController = async (req: IRequest, res: Response) => {
  try {
    const { password } = req.body;
    const hashpassword = await bcrypt.hash(password, 12);

    await Users.findOneAndUpdate(
      { _id: req.user._id },
      {
        password: hashpassword,
      }
    );
    return res.status(200).json({ messgae: "reset password successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const userController = {
  updateUserController,
  resetPasswordController,
};
