import * as express from "express";
import { authentitication } from "../middleware/authentication";
import { authorization } from "../middleware/authorization";
import { OrderController } from "../controllers/order.controller";

const Router = express.Router();

Router.post(
  "",
  authentitication,
  authorization(["client"]),
  OrderController.save);
Router.get(
  "",
  authentitication,
  authorization(["client", "admin"]),
  OrderController.findAll
);
Router.get(
  "/:id",
  authentitication,
  authorization(["client", "admin"]),
  OrderController.findOne
);

export { Router as orderRouter };