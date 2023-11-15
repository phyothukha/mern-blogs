import { IuserRegiser } from "../store/server/auth/interface";

export const valdRegister = (register: IuserRegiser) => {
  const validationErr: Partial<IuserRegiser> = {};

  if (!register.account) {
    validationErr.account = "your email or phone number is required!";
  }
  if (!register.name) {
    validationErr.name = "your name is required!";
  }
  if (!register.password) {
    validationErr.password = "your password is required!";
  }
  if (!validateEmail(register.account) && !validatephone(register.account)) {
    validationErr.account = " your email or phone number is not format!";
  }

  if (register.password !== register.confirmpassword) {
    validationErr.confirmpassword =
      "your confirm-password is not match password!";
  }

  return validationErr;
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
