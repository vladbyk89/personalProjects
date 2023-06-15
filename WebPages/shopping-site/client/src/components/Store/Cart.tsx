import useCart from "../../hooks/useCart";
import EmptyCart from "./EmptyCart";
import { useState, useEffect } from "react";
import CartItem from "./CartItem";
import "../../styles/Cart.scss";
import axios from "axios";
import { CartItemType } from "../../context/CartProvider";

const Cart = () => {
  const [confirm, setConfirm] = useState(false);

  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();

  const onSubmitOrder = async () => {
    const { data } = await axios.get("/api/v1/users/getUser");

    const cartId = data.user.cart;

    await axios.patch("/api/v1/carts", { cart, cartId });

    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };

  const fetchCart = async () => {
    const fetchUser = await axios("api/v1/users/getUser");

    const cartId = fetchUser.data.user.cart[0];

    const { data } = await axios.get(`/api/v1/carts/${cartId}`);
    const cart = data.cart.cart;
    cart.forEach((product: CartItemType) => {
      const { _id, name, price, qty, imgUrl } = product;
      dispatch({
        type: REDUCER_ACTIONS.ADD,
        payload: { _id, name, price, qty, imgUrl },
      });
    });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const pageContent = confirm ? (
    <h2>Thank you for your order.</h2>
  ) : totalItems === 0 ? (
    <EmptyCart />
  ) : (
    <>
      <h1>Your Cart</h1>
      <ul className="cart">
        {cart.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            dispatch={dispatch}
            REDUCER_ACTIONS={REDUCER_ACTIONS}
          ></CartItem>
        ))}
      </ul>
      <div className="cartTotal">
        <p>Total items: {totalItems}</p>
        <p>Total price: {totalPrice}</p>
        <button
          className="button-5"
          disabled={!totalItems}
          onClick={onSubmitOrder}
        >
          Place order
        </button>
      </div>
    </>
  );

  const content = <main className="cartPage">{pageContent}</main>;

  return content;
};

export default Cart;
