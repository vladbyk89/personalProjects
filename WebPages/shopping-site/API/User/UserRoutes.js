"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
const UserController_1 = require("./UserController");
userRouter.route("/").get(UserController_1.getAllUsers).post(UserController_1.createUser);
userRouter.route("/:id").get(UserController_1.getUser);
exports.default = userRouter;
