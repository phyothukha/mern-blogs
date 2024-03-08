import { commentRoute } from "./comment.routes";
import authRoute from "./auth.routes";
import blogRoute from "./blog.routes";
import categoryRoute from "./category.routes";
import userRoutes from "./user.routes";

const router = {
  authRoute,
  userRoutes,
  categoryRoute,
  blogRoute,
  commentRoute,
};

export default router;
