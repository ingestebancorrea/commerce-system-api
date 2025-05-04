import * as express from "express";
import { AuthController } from "../controllers/auth.controller";
import { UserController } from "../controllers/user.controller";

const Router = express.Router();

Router.post("/signup", UserController.signUp);
Router.post("/login", AuthController.login);
Router.get("/renew", AuthController.renewToken);

export { Router as userRouter };