import { AppDataSource } from "./data-source";

const connectDb = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Successfully connected to the database!");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
