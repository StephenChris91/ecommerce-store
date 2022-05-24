import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/ProductControllers.js";
import { protect, admin } from "../data/middleware/authMiddleware.js";

//@desc     Fetch all products
//@route    GET /api/v1/products
//@access   Public

router.route("/").get(getProducts).post(protect, admin, createProduct);

//@desc     Fetch single product
//@route    GET /api/v1/products/:id
//@access   Public

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
