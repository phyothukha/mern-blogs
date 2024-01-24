import { IAuthUser, ICategory } from "../interface";

export interface BlogByCategoryPayload extends ApiPayload {
  id: string;
}

export interface BlogByUserPayload extends ApiPayload {
  id: string;
}

export interface Iblog {
  _id?: string;
  user: string | IAuthUser;
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
  blogs: Iblog[];
}

export interface BlogDetailByCategoryType {
  blogs: Iblog[];
  total: number;
}

export interface BlogDetailByUserType {
  blogs: Iblog[];
  total: number;
}

export interface BlogDetail {
  _id: string;
  category: string;
  content: string;
  createdAt: string;
  description: string;
  thumbnail: string;
  title: string;
  updatedAt: string;
  user: IAuthUser;
}

export interface SelectedBlog {
  // id: string;
  // content: string;
  // title: string;
  // description: string;
  // BlogImage: string;
  // createdAt: string;
  // updatedAt: string;
  // user: string;
  // userId: string;
  // userImage: string;

  id: string;
  content: string;
  title: string;
  description: string;
  BlogImage: string;
  createdAt: string;
  updatedAt: string;
  user: IAuthUser;
  userId: string | undefined;
  userImage: string | File;
}
