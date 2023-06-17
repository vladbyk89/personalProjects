import { NextFunction, Response, Request } from "express";
import Cart from "./CartModel";
import CartProduct from "../CartProduct/CartProductModel";
import Product from "../Product/ProductModel";
import User from "../User/UserModel";

export const getAllCarts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const carts = await Cart.find({});

    res.status(200).json({ ok: true, carts });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const createCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { cart } = req.body;

    const cart = await Cart.create({});

    res.status(200).json({ ok: true, cart });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const updateCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cart, cartId } = req.body;

    await Cart.findByIdAndUpdate(cartId, { cart });

    const updatedCart = await Cart.findById(cartId);

    res.status(200).json({ ok: true, cart: updatedCart });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const cart = await Cart.findById(id);

    res.status(200).json({ ok: true, cart });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

