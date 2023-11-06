import { NextFunction, Request, Response } from "express";

export const validateRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, account, password } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Please add your name!" });
  } else if (name.length > 20) {
    return res
      .status(400)
      .json({ message: "name must be at lease 20 characters! " });
  }

  if (!account) {
    return res.status(400).json({ message: "Please add your email!" });
  } else if (!validatephone(account) && !validateEmail(account)) {
    return res
      .status(400)
      .json({ message: "your email or phone number  format is not correct!" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 chars!" });
  }

  next();
};

const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const validatephone = (phone: string) => {
  return phone.match("^(09|\\+?950?9|\\+?95950?9)\\d{7,9}$");
};
