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
exports.getCartProduct = exports.createCartProduct = exports.getAllCartProducts = void 0;
const CartProductModel_1 = __importDefault(require("./CartProductModel"));
const getAllCartProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield CartProductModel_1.default.find({}).populate("product");
        res.status(200).json({ ok: true, products });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.getAllCartProducts = getAllCartProducts;
const createCartProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, amount } = req.body;
        const product = yield CartProductModel_1.default.create({
            product: [productId],
            amount,
        });
        res.status(200).json({ ok: true, product });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.createCartProduct = createCartProduct;
const getCartProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield CartProductModel_1.default.findById(id).populate("product");
        res.status(200).json({ ok: true, product });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.getCartProduct = getCartProduct;
