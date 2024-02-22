import * as express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import * as bodyParser from "body-parser";
import { AppDataSource } from "./config/data-source";

const port = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());

    app.listen(port);

    console.log(`Express server has started on port ${port}`);
  })
  .catch((error) => console.log(error));
