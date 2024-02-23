import * as dotenv from "dotenv";
import connectDb from "./config/db";
import { AppDataSource } from "./config/data-source";
import { User } from "./entity/User";
import { Product } from "./entity/Product";
import { Order } from "./entity/Order";
import users from "./data/users";
import products from "./data/products";

dotenv.config();

const importData = async () => {
  try {
    await connectDb();

    await await AppDataSource.getRepository(User).delete({});
    await await AppDataSource.getRepository(Product).delete({});
    await await AppDataSource.getRepository(Order).delete({});

    await AppDataSource.getRepository(User).save(users);
    const createdUsers = await AppDataSource.getRepository(User).find();
    const adminUser = createdUsers[0];

    const productsWithAdminUser = products.map((product) => ({
      ...product,
      user: adminUser,
    }));

    await AppDataSource.getRepository(Product).save(productsWithAdminUser);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
    try {
        await connectDb();

        await await AppDataSource.getRepository(User).delete({});
        await await AppDataSource.getRepository(Product).delete({});
        await await AppDataSource.getRepository(Order).delete({});
  
      console.log('Data Destroyed!')
      process.exit()
    } catch (error) {
      console.error(`${error}`)
      process.exit(1)
    }
  }

  if (process.argv[2] === '-d') {
    destroyData()
  } else {
    importData()
  }