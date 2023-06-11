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
    const { cartProductsIds, userId } = req.body;

    const arr = await CartProduct.find({ _id: { $in: cartProductsIds } });

    const user = await User.findById(userId);

    const cart = await Cart.create({
      cartProducts: [...arr],
      user,
    });

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
    const { cartProductsIds, cartId, userId } = req.body;

    const arr = await CartProduct.find({ _id: { $in: cartProductsIds } });

    const cart = await Cart.findByIdAndUpdate(cartId, { cartProducts: arr });

    const user = await User.findByIdAndUpdate(userId, { cart });

    res.status(200).json({ ok: true, cart, user });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getUserCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    const cart = await Cart.find({ user }).populate("cartProducts user");

    res.status(200).json({ ok: true, cart });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
