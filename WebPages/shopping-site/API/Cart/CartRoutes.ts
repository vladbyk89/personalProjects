import express from "express";
const cartRouter = express.Router();

import { getAllCarts, createCart, getCart, updateCart } from "./CartController";

cartRouter.route("/").get(getAllCarts).post(createCart).patch(updateCart);

cartRouter.route("/:id").get(getCart);

// cartRouter.route("/:updateCart").patch(updateCart);

export default cartRouter;
