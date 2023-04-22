import { NextFunction, Response, Request } from "express";
import User from "../model/UserModel";

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
    const { userName, password } = req.query;
    const user = await User.find({ userName, password });
    res.redirect("/main");
    // res.status(200).json({ user });
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
