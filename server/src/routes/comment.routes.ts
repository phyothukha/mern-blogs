import { Router } from "express";
import { authentication } from "../middleware/auth";
import { CommentController } from "../controller/comment.controller";

const router = Router();

const createComment = router.post(
  "/create/comment",
  authentication,
  CommentController.createComment
);
const getComments = router.get(
  "/get/comment/:id",
  CommentController.getComments
);
// const replyComment = router.post(
//   "/reply/comment",
//   authentication,
//   CommentController.replyComment
// );

const CommentRoute = [createComment, getComments];

export default CommentRoute;
