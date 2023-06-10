"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartRouter = express_1.default.Router();
const CartController_1 = require("./CartController");
cartRouter.route("/").get(CartController_1.getAllCarts).post(CartController_1.createCart);
cartRouter.route("/:id").get(CartController_1.getUserCart);
exports.default = cartRouter;
