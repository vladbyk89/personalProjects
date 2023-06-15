import { NextFunction, Response, Request } from "express";
import jwt from "jwt-simple";
const secret = process.env.JWT_SECRET;
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
    const { userName, email, password } = req.body;

    const cart = await Cart.create({});

    const user = await (
      await User.create({ userName, email, password, cart: [cart._id] })
    ).populate("cart");

    const userId = user._id;

    req.body = userId;

    next();
    // res.status(200).json({ ok: true, user });
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
    if (!secret) throw new Error("Missing jwt secret");
    const token = req.cookies;
    if (!token) throw new Error("Missing token from cookise");

    const decodedToken = jwt.decode(token.userId, secret);

    const user = await User.findById(decodedToken.userId);

    res.status(200).json({ ok: true, user });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const confirmUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.find({ email, password });

    if (!user) throw new Error("user not found");

    const userId = user[0]._id;

    if (!secret) throw new Error("Missing jwt secret");

    const token = jwt.encode({ userId, role: "public" }, secret);

    if (!token) throw new Error("Missing token...");

    res.cookie("userId", token, {
      httpOnly: true,
      maxAge: 0,
    });

    res.status(200).json({ ok: true, user });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
