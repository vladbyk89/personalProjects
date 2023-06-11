import { NextFunction, Response, Request } from "express";
import User from "./UserModel";
import Cart from "../Cart/CartModel";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});

    res.status(200).json({ ok: true, users });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userName, password } = req.body;

    const cart = await Cart.create({});

    const user = await User.create({ userName, password, cart });

    res.status(200).json({ ok: true, user });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    res.status(200).json({ ok: true, user });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
