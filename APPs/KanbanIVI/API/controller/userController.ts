import { NextFunction, Response, Request } from "express";
import User from "../model/UserModel";
import jwt from "jwt-simple";
const secret = process.env.JWT_SECRET;

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, userName, password } = req.body;
    const user = await User.create({ name, userName, password });
    const users = await User.find({});
    res.status(200).json({
      msg: `User ${user} is added to:
    ${users}`,
    });
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
    console.log(token.signedUpUsers);
    if (!token) throw new Error("Missing token from cookise");
    const decodedToken = jwt.decode(token.signedUpUsers, secret);

    console.log(decodedToken);
    res.json({ ok: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userName, password } = req.body;

    //User Authentication....

    const findUser = await User.findOne({ userName, password });

    if (!findUser) throw new Error("User not found on get user function");

    if (!secret) throw new Error("Missing jwt secret");
    console.log(findUser._id);
    const token = jwt.encode({ userId: findUser._id, role: "public" }, secret);
    // console.log(token);

    res.cookie("signedUpUsers", token, {
      maxAge: 24 * 60 * 60 * 1000, //24 hours
      httpOnly: true,
    });
    res.redirect("/main");
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.params;
    const user = await User.deleteOne({ _id: userId });
    const users = await User.find({});

    res.status(200).send({ users });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.params;
    const data = req.body;
    const users = await User.find({});
    const user = await User.findById({ _id: userId });

    res.status(201).json({ users });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
