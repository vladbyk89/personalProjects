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
exports.updateList = exports.deleteList = exports.getBoardLists = exports.createList = exports.getAllLists = void 0;
const ListModel_1 = __importDefault(require("../model/ListModel"));
const BoardModel_1 = __importDefault(require("../model/BoardModel"));
const getAllLists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield ListModel_1.default.find({});
        res.status(200).json({ list });
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllLists = getAllLists;
const createList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { listName, boardId } = req.body;
        const board = yield BoardModel_1.default.findById(boardId);
        const list = yield ListModel_1.default.create({ listName, board });
        res.status(200).json({ list });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.createList = createList;
const getBoardLists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: boardId } = req.params;
        const board = yield BoardModel_1.default.findById(boardId);
        const lists = yield ListModel_1.default.find({ board });
        res.status(200).json({ lists });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.getBoardLists = getBoardLists;
const deleteList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: listId } = req.params;
        const list = yield ListModel_1.default.deleteOne({ _id: listId });
        const lists = yield ListModel_1.default.find({});
        res.status(200).send({ lists });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
exports.deleteList = deleteList;
const updateList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: listId } = req.params;
        const { listName, cardsArray, boardId } = req.body;
        const board = yield BoardModel_1.default.findById(boardId);
        const list = yield ListModel_1.default.findByIdAndUpdate(listId, {
            listName,
            cardsArray,
            board,
        });
        res.status(201).json({ list });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.updateList = updateList;
