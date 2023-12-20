import { Iblog } from "../store/server/blog-post/interface";
import { IuserLogin, IuserRegiser } from "../store/server/interface";

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
  if (
    !validateEmail(register.account ?? "") &&
    !validatePhone(register.account ?? "")
  ) {
    validationErr.account = " your email or phone number is not format!";
  }

  if (register.password !== register.confirmpassword) {
    validationErr.confirmpassword =
      "your confirm-password is not match password!";
  }

  return validationErr;
};

export const validLogin = (login: IuserLogin) => {
  const validationErr: Partial<IuserLogin> = {};
  if (!login.account) {
    validationErr.account = "your email or phone number is required!";
  }
  if (!login.password) {
    validationErr.password = "your password is required!";
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

export const validatePhone = (phone: string) => {
  const re = /^(09|\+?950?9|\+?95950?9)\d{7,9}$/;
  return re.test(phone);
};

export const checkPassword = (password: string, confirmPassword: string) => {
  if (password.length < 6) {
    return (password = "your password must be less than 6");
  } else if (password !== confirmPassword) {
    return (confirmPassword = "your confirm password did not match!");
  }
};

export const validationCreateBlog = (blog: Iblog) => {
  const validationErr: Partial<Iblog> = {};

  if (blog.title.trim().length < 20) {
    validationErr.title = "Title has at least 20 chars";
  } else if (blog.title.trim().length > 50) {
    validationErr.title = "Title has up to 50 chars";
  }

  if (blog.content.trim().length < 2000) {
    validationErr.content = "Content has at least 2000 chars";
  }

  if (blog.description.trim().length < 50) {
    validationErr.description = "description has at least 50 chars";
  } else if (blog.description.trim().length > 200) {
    validationErr.description = "description has up to 200 chars long.";
  }

  if (!blog.thumbnail) {
    validationErr.thumbnail = "thumbnail cannot be blank!";
  }

  if (!blog.category) {
    validationErr.category = "Category cannot be blank!";
  }

  return validationErr;
};
