import * as express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import * as bodyParser from "body-parser";
import { AppDataSource } from "./config/data-source";
import { userRoutes } from "./routes/userRoutes";
import connectDb from "./config/db";

connectDb();

const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/users", userRoutes);

app.listen(port);

console.log(`Express server has started on port ${port}`);
