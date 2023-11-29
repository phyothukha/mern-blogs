export interface IuserLogin {
  account?: string;
  phone?: string;
  password?: string;
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

export interface IAuthPayload {
  access_token?: string;
  message?: string;
  refresh_token?: string;
  user?: IAuthUser;
}

export interface ISmsPayload {
  phone: string;
  code?: string;
}
