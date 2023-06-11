import express from "express";
const cartRouter = express.Router();

import {
  getAllCarts,
  createCart,
  getUserCart,
  updateCart,
} from "./CartController";

cartRouter.route("/").get(getAllCarts).post(createCart);

cartRouter.route("/:id").get(getUserCart);

cartRouter.route("/:updateCart").patch(updateCart);

export default cartRouter;
