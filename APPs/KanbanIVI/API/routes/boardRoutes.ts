import express from "express";
const boardRouter = express.Router();
import {
  getAllBoards,
  createBoard,
  getBoard,
  deleteBoard,
  updateBoard,
} from "../controller/boardController";

boardRouter.route("/").get(getAllBoards).post(createBoard);
boardRouter.route("/:id").get(getBoard).patch(updateBoard).delete(deleteBoard);

export { boardRouter };
