import { Router } from "express";
import { authentication } from "../middleware/auth";
import { commentController } from "../controller/comment.controller";

const router = Router();

const createComment = router.post(
  "/create/comment",
  authentication,
  commentController.createComment
);
const getComment = router.get("/get/comment/:id", commentController.getComment);

export const commentRoute = [createComment, getComment];
