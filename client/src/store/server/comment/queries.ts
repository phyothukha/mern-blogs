import { useQuery } from "@tanstack/react-query";
import { axios } from "..";
import { Comment, SelectedComment, getCommentPayload } from "./interface";
import { getParams } from "../../../utils/getParams";

// const getComments = async ({
//   id,
//   ...payload
// }: getCommentPayload): Promise<Comment> => {
//   const params = getParams(payload);
//   const res = await axios.get(`/get/comment/${id}?${params}`);
//   return res.data;
// };

// export const useGetComment = ({ id, ...payload }: getCommentPayload) => {
//   return useQuery({
//     queryKey: ["get-comments", id, payload],
//     queryFn: () => getComments({ id, ...payload }),
//     select: (data): SelectedComment[] =>
//       data.comments.map((comment) => ({
//         id: comment?._id,
//         user: comment.user,
//         blog_id: comment.blog_id,
//         blog_user_id: comment.blog_user_id,
//         content: comment.content,
//         createdAt: comment.createdAt,
//         reply_user: comment.reply_user,
//         replyCM: comment.replyCM,
//         comment_root: comment?.comment_root,
//       })),
//   });
// };

const getComments = async ({
  id,
  ...payload
}: getCommentPayload): Promise<Comment> => {
  const params = getParams(payload);
  const res = await axios.get(`/get/comment/${id}?${params}`);
  return res.data;
};

export const useGetComment = ({ id, ...payload }: getCommentPayload) => {
  return useQuery({
    queryKey: ["get-comment", id, payload],
    queryFn: () => getComments({ id, ...payload }),
    select: (data): SelectedComment[] =>
      data.comments.map((cmt) => ({
        id: cmt._id,
        user: cmt.user,
        content: cmt.content,
        blog_id: cmt.blog_id,
        blog_user_id: cmt.blog_user_id,
        replyCM: cmt.replyCM,
        reply_user: cmt.reply_user,
        createdAt: cmt.createdAt,
        comment_root: cmt.comment_root,
      })),

    // select:(data):SelectedComment[]=>data.comments.map(()=>({

    // }))
  });
};
