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

import { setBoardCookie } from "../middleware/setCookieJWT";

boardRouter.route("/").get(getAllBoards).post(createBoard, setBoardCookie);

boardRouter.route("/getBoard").get(boardCookieAuthentication, getBoard);

boardRouter
  .route("/:id")
  .get(getAllUserBoards)
  .post(setBoardCookie)
  .patch(updateBoard)
  .delete(deleteBoard);

export { boardRouter };
