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
exports.updateBoard = exports.deleteBoard = exports.getBoard = exports.createBoard = exports.getAllBoards = void 0;
const BoardModel_1 = __importDefault(require("../model/BoardModel"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
const getAllBoards = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBoards = yield BoardModel_1.default.find({});
        res.status(200).json({ allBoards });
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllBoards = getAllBoards;
const createBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, imageSrc, userId } = req.body;
        const user = yield UserModel_1.default.findById(userId);
        // const board = await Board.create({
        //   name,
        //   imageSrc,
        //   userArray: [user],
        // });
        const boards = yield BoardModel_1.default.find({});
        res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.createBoard = createBoard;
const getBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: boardId } = req.params;
        const board = yield BoardModel_1.default.findById(boardId);
        // const courses = await Course.find({ boards: board });
        res.status(200).json({ board });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.getBoard = getBoard;
const deleteBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: boardId } = req.params;
        const board = yield BoardModel_1.default.deleteOne({ _id: boardId });
        const boards = yield BoardModel_1.default.find({});
        res.status(200).send({ boards });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
exports.deleteBoard = deleteBoard;
const updateBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: boardId } = req.params;
        const data = req.body;
        const boards = yield BoardModel_1.default.find({});
        const board = yield BoardModel_1.default.findById({ _id: boardId });
        res.status(201).json({ boards });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.updateBoard = updateBoard;
