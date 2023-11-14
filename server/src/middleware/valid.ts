import { NextFunction, Request, Response } from "express";

export const validateRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, account, password } = req.body;
  const errors = [];

  if (!name) {
    errors.push("Please add your name!");
  } else if (name.length > 20) {
    errors.push("name must be at lease 20 characters! ");
  }

  if (!account) {
    errors.push("Please add your email!");
  } else if (!validatephone(account) && !validateEmail(account)) {
    errors.push("your email or phone number  format is not correct!");
  }

  if (password.length < 6) {
    errors.push("Password must be at least 6 chars!");
  }

  if (errors.length > 0) return res.status(400).json({ message: errors });
  next();
};

export const validateEmail = (email: string) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatephone = (phone: string) => {
  return phone.match("^(09|\\+?950?9|\\+?95950?9)\\d{7,9}$");
};
