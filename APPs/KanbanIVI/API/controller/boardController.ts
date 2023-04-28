import { NextFunction, Response, Request } from "express";
import Board from "../model/BoardModel";
import User from "../model/UserModel";
import List from "../model/ListModel";

export const getAllBoards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allBoards = await Board.find({});
    res.status(200).json({ allBoards });
  } catch (error) {
    console.error(error);
  }
};

export const createBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, imageSrc, userId } = req.body;
    const user = await User.findById(userId);
    // const board = await Board.create({
    //   name,
    //   imageSrc,
    //   userArray: [user],
    // });
    const boards = await Board.find({});
    res.status(200).json({ user });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: boardId } = req.params;
    const board = await Board.findById(boardId);
    // const courses = await Course.find({ boards: board });
    res.status(200).json({ board });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const deleteBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: boardId } = req.params;
    const board = await Board.deleteOne({ _id: boardId });
    const boards = await Board.find({});

    res.status(200).send({ boards });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: boardId } = req.params;
    const data = req.body;
    const boards = await Board.find({});
    const board = await Board.findById({ _id: boardId });

    res.status(201).json({ boards });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
