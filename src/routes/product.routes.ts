import * as express from "express";
import { ProductController } from "../controllers/product.controller";
import { authentitication } from "../middleware/authentication";
import { authorization } from "../middleware/authorization";

const Router = express.Router();

Router.post(
  "/", 
  authentitication,
  authorization(["admin"]),
  ProductController.save
);
Router.get(
  "",
  authentitication,
  authorization(["client", "admin"]),
  ProductController.findAll
);
Router.get(
  "/:id",
  authentitication,
  authorization(["client", "admin"]),
  ProductController.findOne
);
Router.put(
  "/:id",
  authentitication,
  authorization(["admin"]),
  ProductController.update
);
Router.delete(
  "/:id",
  authentitication,
  authorization(["admin"]),
  ProductController.delete
);

export { Router as productRouter };