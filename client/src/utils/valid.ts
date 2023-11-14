// import { IuserRegiser } from "../store/server/auth/interface";

// export const validRegister = (userRegister: IuserRegiser) => {
//   const { name, account, password, confirmpassword } = userRegister;

//   const errors: string[] = [];

//   if (!name) {
//     errors.push("Please add your name!");
//   } else if (name.length > 20) {
//     errors.push("your name must be at least 20 chars!");
//   }

//   if (!account) {
//     errors.push("Please add your account");
//   } else if (validateEmail(account) && validatephone(account)) {
//     errors.push("Email or phone number format is not correct!");
//   }

//   if (password.length < 6) {
//     errors.push("Password must be at least 6 chars");
//   } else if (password !== confirmpassword) {
//     errors.push("Confimpassword did not match!");
//   }
//   console.log(errors);
//   return { errors };
// };

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
