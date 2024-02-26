import * as express from "express";
import { getProducts, getProductById,createProduct } from "../controller/productController";
const router = express.Router();

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getProductById);

export { router as productRoutes };
