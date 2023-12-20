import { Router } from "express";
import { BlogController } from "../controller/blog.controller";
import { authentication } from "../middleware/auth";

const router = Router();

const createBlog = router.post(
  "/create/blog",
  authentication,
  BlogController.createBlog
);

const getHomeBlog = router.get("/get/blogs", BlogController.getHomeBlog);
const getBlogsByCategory = router.get(
  "/blogs/category/:id",
  BlogController.getBlogsByCategory
);
const getBlogsByUser = router.get(
  "/blogs/user/:id",
  BlogController.getBlogsByUser
);

const blogRoute = [createBlog, getHomeBlog, getBlogsByCategory, getBlogsByUser];

export default blogRoute;
