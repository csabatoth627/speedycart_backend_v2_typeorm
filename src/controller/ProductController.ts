import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { getAllProducts,findProductById, saveSampleProduct } from "../repository/ProductRepository";

const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await getAllProducts();
  res.json(products);
});

const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await findProductById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await saveSampleProduct(req.user.id);
  res.status(201).json(product);
});

export { getProducts, getProductById, createProduct };
