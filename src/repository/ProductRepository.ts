import { AppDataSource } from "../config/data-source";
import { Product } from "../entity/Product";
import { Repository } from "typeorm";

const productRepository: Repository<Product> =
  AppDataSource.getRepository(Product);

const getAllProducts = () => {
  return productRepository.find();
};

const findProductById = (id) => {
  return productRepository.findOne({
    where: {
      _id: id,
    },
  });
};

export { getAllProducts, findProductById };
