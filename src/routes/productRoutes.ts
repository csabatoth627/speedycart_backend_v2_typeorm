import * as express from "express";
import { getProducts, getProductById } from "../controller/productController";
const router = express.Router();

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

export {router as productRoutes}

