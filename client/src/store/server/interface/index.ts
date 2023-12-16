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
  role?: string;
  type?: string;
  _id?: string;
  name: string;
  avatar: string | File;
  createdAt?: string;
  updatedAt?: string;
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

export interface createCategoryPayload {
  token?: string;
  name: string;
}

export interface MutationProp<T> {
  id?: string;
  token?: string;
  payload: T;
}

export interface ICategory {
  createdAt: string;
  name: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface IuserPayload {
  name: string;
  avatar: string | File;
}

export interface resetPayload {
  token?: string;
  password: string;
}

export interface Iuser {
  access_token?: string;
  user?: IAuthUser | null;
}

export interface Iblog {
  _id?: string;
  user: Iuser | string;
  title: string;
  content: string;
  description: string;
  thumbnail: File | string;
  category?: string | ICategory;
  createdAt: string;
}

export interface BlogPostType {
  _id: string;
  count: number;
  name: string;
  blogs: [Iblog];
}

export interface BlogDetailByCategoryType {
  blogs: Iblog[];
  total: number;
}
