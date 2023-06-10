import express from "express";
const cartRouter = express.Router();

import { getAllCarts, createCart, getUserCart } from "./CartController";

cartRouter.route("/").get(getAllCarts).post(createCart);

cartRouter.route("/:id").get(getUserCart);

export default cartRouter;
