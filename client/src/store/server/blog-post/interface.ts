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
