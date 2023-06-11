import express from "express";
const cartProductRouter = express.Router();

import {
  getAllCartProducts,
  createCartProduct,
  getCartProduct,
  
} from "./CartProductController";

cartProductRouter.route("/").get(getAllCartProducts).post(createCartProduct);

cartProductRouter.route("/:id").get(getCartProduct);

export default cartProductRouter;
