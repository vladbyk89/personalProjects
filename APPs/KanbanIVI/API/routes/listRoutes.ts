import express from "express";
const listRouter = express.Router();
import {
  getAllLists,
  createList,
  getList,
  deleteList,
  updateList,
} from "../controller/listController";

listRouter.route("/").get(getAllLists).post(createList);
listRouter.route("/:id").get(getList).patch(updateList).delete(deleteList);

export { listRouter };
