export interface IuserLogin {
  account: string;
  password: string;
}

export interface IuserRegiser extends IuserLogin {
  name: string;
  confirmpassword: string;
}

export interface IAuthUser extends IuserLogin {
  role: string;
  type: string;
  _id: string;
  name: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}
