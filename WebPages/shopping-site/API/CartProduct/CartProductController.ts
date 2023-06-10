import { NextFunction, Response, Request } from "express";
import CartProduct from "./CartProductModel";
import { ProductInterface } from "../Product/ProductModel";

export const getAllCartProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await CartProduct.find({}).populate("product");

    res.status(200).json({ ok: true, products });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const createCartProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, amount } = req.body;

    const product = await CartProduct.create({
      product: [productId],
      amount,
    });

    res.status(200).json({ ok: true, product });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getCartProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const product = await CartProduct.findById(id).populate("product");

    res.status(200).json({ ok: true, product });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
