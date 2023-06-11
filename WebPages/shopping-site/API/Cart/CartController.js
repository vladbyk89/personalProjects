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
exports.getCart = exports.createCart = exports.getAllCarts = void 0;
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
        const { cartProductsIds } = req.body;
        // const arr = await CartProduct.find({ _id: { $in: cartProductsIds } });
        const cart = yield (yield CartModel_1.default.create({ cartProducts: [...cartProductsIds] })).populate("cartProducts");
        res.status(200).json({ ok: true, cart });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.createCart = createCart;
// export const updateCart = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { cartProductsIds, cartId, userId } = req.body;
//     const updatedCartProducts = await CartProduct.find({
//       _id: { $in: cartProductsIds },
//     });
//     const arr = await CartProduct.findByIdAndUpdate(
//       { _id: { $in: cartProductsIds } },
//       { cartProducts: updatedCartProducts }
//     );
//     const cart = await Cart.findByIdAndUpdate(cartId, {
//       cartProducts: updatedCartProducts,
//     });
//     const user = await User.findByIdAndUpdate(userId, { cart });
//     res.status(200).json({ ok: true, cart, user });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).send({ error: error.message });
//   }
// };
const getCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartId } = req.params;
        const cart = yield CartModel_1.default.findById(cartId).populate("cartProducts");
        res.status(200).json({ ok: true, cart });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.getCart = getCart;
