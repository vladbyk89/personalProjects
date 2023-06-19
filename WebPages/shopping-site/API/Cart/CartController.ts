import { NextFunction, Response, Request } from "express";
import Cart from "./CartModel";
import CartProduct from "../CartProduct/CartProductModel";
import Product from "../Product/ProductModel";
import User from "../User/UserModel";
import { count } from "console";

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
    const { product, cartId, qty } = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart) return;

    const filterCart = cart.cart.filter(
      (productItem) => productItem._id !== product._id
    );

    console.log("filer", filterCart);

    const productExists = cart?.cart.find(
      (productItem) => productItem._id === product._id
    );

    if (productExists)
      await Cart.updateOne(
        {
          cart: { $elemMatch: { _id: product._id } },
        },
        {
          $set: { "cart.$.qty": qty },
        }
      );
      else{
        cart.cart.push({ ...product, qty });
      }

    const find = await Cart.findOne({
      cart: { $elemMatch: { _id: product._id } },
    });

    console.log("cart:", cart);

    console.log(find);

    // productExists
    //   ? (cart.cart = [...filterCart, { ...productExists }])
    //   : cart.cart.push({ ...product, qty });

    // const updatedCart = [...filterCart, { ...productExists }];

    // if (productExists) productExists.qty += qty;
    // else {
    //   cart.cart = [...filterCart];
    // }

    await cart.save();

    // console.log(cart);

    res.status(200).json({ ok: true, cart });
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
