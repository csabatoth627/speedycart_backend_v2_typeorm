import { AppDataSource } from "../config/data-source";
import { Product } from "../entity/Product";
import { Repository } from "typeorm";
import { User } from "../entity/User";

const userRepository: Repository<User> = AppDataSource.getRepository(User);

const productRepository: Repository<Product> =
  AppDataSource.getRepository(Product);

const getAllProducts =  (): Promise<Product[]> => {
  return  productRepository.find();
};

const findProductById =  (id: string): Promise<Product | undefined> => {
  return  productRepository.findOne({
    where: {
      _id: id,
    },
  });
};

const saveSampleProduct = async (userId: string): Promise<Product> => {
  const user: User = await userRepository.findOne({
    where: {
      _id: userId,
    },
  });

  const product: Product = new Product();
  product.name = 'Sample name'
  product.price = 0
  product.user = user
  product.image = '/images/sample.jpg'
  product.brand = 'Sample brand'
  product.category = 'Sample Category'
  product.countInStock = 0,
  product.numReviews = 0,
  product.description = 'Sample description'

  return  productRepository.save(product)
};

export { getAllProducts, findProductById, saveSampleProduct };
