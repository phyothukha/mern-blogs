import authRoute from "./auth.routes";
import blogRoute from "./blog.routes";
import categoryRoute from "./category.routes";
import CommentRoute from "./comment.routes";
import userRoutes from "./user.routes";

const router = {
  authRoute,
  userRoutes,
  categoryRoute,
  blogRoute,
  CommentRoute,
};

export default router;
