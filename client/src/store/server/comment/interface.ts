import { IAuthUser } from "../interface";

export interface IComment {
  _id?: string;
  user: IAuthUser;
  blog_id: string;
  blog_user_id: string;
  content: string;
  replyCM?: IComment[];
  reply_user?: IAuthUser;
  comment_root?: string;
  createdAt: string;
}

export interface getCommentPayload extends ApiPayload {
  id: string;
}

export interface Comment {
  comments: IComment[];
  total: number;
}

export interface SelectedComment {
  id?: string;
  user: IAuthUser;
  content: string;
  blog_id: string;
  blog_user_id: string;
  replyCM?: SelectedComment[];
  reply_user?: IAuthUser;
  createdAt: string;
  comment_root?: string;
}
