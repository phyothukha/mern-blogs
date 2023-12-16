import { Router } from "express";
import { categoryController } from "../controller/category.controller";
import { AdminPersmission, authentication } from "../middleware/auth";

const router = Router();

const createCategory = router.post(
  "/category",
  authentication,
  AdminPersmission,
  categoryController.createCategory
);

const getCategory = router.get("/category", categoryController.getCategory);
const updateCategory = router.patch(
  "/category/:id",
  authentication,
  AdminPersmission,
  categoryController.updateCategory
);

const deleteCategory = router.delete(
  "/category/:id",
  authentication,
  AdminPersmission,
  categoryController.deleteCategory
);

const categoryRoute = [
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
];

export default categoryRoute;
