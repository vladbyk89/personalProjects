"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.createUser = exports.getAllUsers = void 0;
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const secret = process.env.JWT_SECRET;
const UserModel_1 = __importDefault(require("./UserModel"));
const CartModel_1 = __importDefault(require("../Cart/CartModel"));
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel_1.default.find({});
        res.status(200).json({ ok: true, users });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        const cart = yield CartModel_1.default.create({});
        const user = yield (yield UserModel_1.default.create({ userName, email, password, cart: [cart._id] })).populate("cart");
        const userId = user._id;
        req.body = userId;
        next();
        // res.status(200).json({ ok: true, user });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.createUser = createUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!secret)
            throw new Error("Missing jwt secret");
        const token = req.cookies;
        if (!token)
            throw new Error("Missing token from cookise");
        const decodedToken = jwt_simple_1.default.decode(token.userId, secret);
        const user = yield UserModel_1.default.findById(decodedToken.userId);
        res.status(200).json({ ok: true, user });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.getUser = getUser;
