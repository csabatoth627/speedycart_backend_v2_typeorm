import * as express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import * as bodyParser from "body-parser";
import { userRoutes } from "./routes/userRoutes";
import { productRoutes } from "./routes/productRoutes";
import { notFound, errorHandler } from "./middleware/errorHandler";
import connectDb from "./config/db";

const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`Express server has started on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to database:", error.message);
  }
};

startServer();
