import express from "express";
const boardRouter = express.Router();

import {
  getAllBoards,
  createBoard,
  getBoard,
  getAllUserBoards,
  deleteBoard,
  updateBoard,
} from "../controller/boardController";

import { boardCookieAuthentication } from "../middleware/cookieJwtAuthintication";

boardRouter.route("/").get(getAllBoards).post(createBoard);

boardRouter.route("/getBoard").get(boardCookieAuthentication, getBoard);

boardRouter.route("/:id").get(getAllUserBoards).patch(updateBoard).delete(deleteBoard);

export { boardRouter };
