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
    const { cartProductsIds } = req.body;

    // const arr = await CartProduct.find({ _id: { $in: cartProductsIds } });

    const cart = await (
      await Cart.create({ cartProducts: [...cartProductsIds] })
    ).populate("cartProducts");

    res.status(200).json({ ok: true, cart });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

// export const updateCart = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { cartProductsIds, cartId, userId } = req.body;

//     const updatedCartProducts = await CartProduct.find({
//       _id: { $in: cartProductsIds },
//     });

//     const arr = await CartProduct.findByIdAndUpdate(
//       { _id: { $in: cartProductsIds } },
//       { cartProducts: updatedCartProducts }
//     );

//     const cart = await Cart.findByIdAndUpdate(cartId, {
//       cartProducts: updatedCartProducts,
//     });

//     const user = await User.findByIdAndUpdate(userId, { cart });

//     res.status(200).json({ ok: true, cart, user });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).send({ error: error.message });
//   }
// };

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cartId } = req.params;

    const cart = await Cart.findById(cartId).populate("cartProducts");

    res.status(200).json({ ok: true, cart });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
