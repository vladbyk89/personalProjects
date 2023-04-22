import { NextFunction, Response, Request } from "express";
import Board from "../model/BoardModel";
import UserModel from "../model/UserModel";
import ListModel from "../model/ListModel";

export const getAllBoards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { boardName, password } = req.body;
    const board = await Board.find({});
    res.status(200).json({ board });
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
    const { name, imageSrc, userId, listId } = req.body;
    const user = await UserModel.findById(userId);
    const list = await ListModel.findById(listId);
    const board = await Board.create({
      name,
      imageSrc,
      userArray: [user],
      listArray: [list],
    });
    const boards = await Board.find({});
    res.status(200).json({
      msg: `Board ${board} is added to:
    ${boards}`,
    });
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
