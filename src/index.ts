import { AppDataSource } from "./data-source";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Request, Response } from "express";
import * as swaggerUi from 'swagger-ui-express';
import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";
import { userRouter } from "./routes/user.routes";
import { productRouter } from "./routes/product.routes";
import { orderRouter } from "./routes/order.routes";
import swaggerDocs from "../swagger.json";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const { PORT = 3000 } = process.env;

// Routes
app.use("/api/auth", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/docs",swaggerUi.serve,swaggerUi.setup(swaggerDocs))

app.all('/{*any}', (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

app.use(errorHandler);

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));