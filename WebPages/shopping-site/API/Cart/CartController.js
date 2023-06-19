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
exports.getCart = exports.updateCart = exports.createCart = exports.getAllCarts = void 0;
const CartModel_1 = __importDefault(require("./CartModel"));
const getAllCarts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carts = yield CartModel_1.default.find({});
        res.status(200).json({ ok: true, carts });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.getAllCarts = getAllCarts;
const createCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { cart } = req.body;
        const cart = yield CartModel_1.default.create({});
        res.status(200).json({ ok: true, cart });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.createCart = createCart;
const updateCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product, cartId, qty } = req.body;
        const cart = yield CartModel_1.default.findById(cartId);
        if (!cart)
            return;
        const filterCart = cart.cart.filter((productItem) => productItem._id !== product._id);
        console.log("filer", filterCart);
        const productExists = cart === null || cart === void 0 ? void 0 : cart.cart.find((productItem) => productItem._id === product._id);
        if (productExists)
            yield CartModel_1.default.updateOne({
                cart: { $elemMatch: { _id: product._id } },
            }, {
                $set: { "cart.$.qty": qty },
            });
        else {
            cart.cart.push(Object.assign(Object.assign({}, product), { qty }));
        }
        const find = yield CartModel_1.default.findOne({
            cart: { $elemMatch: { _id: product._id } },
        });
        console.log("cart:", cart);
        console.log(find);
        // productExists
        //   ? (cart.cart = [...filterCart, { ...productExists }])
        //   : cart.cart.push({ ...product, qty });
        // const updatedCart = [...filterCart, { ...productExists }];
        // if (productExists) productExists.qty += qty;
        // else {
        //   cart.cart = [...filterCart];
        // }
        yield cart.save();
        // console.log(cart);
        res.status(200).json({ ok: true, cart });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.updateCart = updateCart;
const getCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cart = yield CartModel_1.default.findById(id);
        res.status(200).json({ ok: true, cart });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.getCart = getCart;
