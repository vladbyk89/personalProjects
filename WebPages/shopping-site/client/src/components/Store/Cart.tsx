import useCart from "../../hooks/useCart";
import EmptyCart from "./EmptyCart";
import { useState, useEffect } from "react";
import CartItem from "./CartItem";
import "../../styles/Cart.scss";
import axios from "axios";
import { CartItemType, CartStateType } from "../../context/CartProvider";
import useUser from "../../hooks/useUser";

const Cart = () => {
  const [confirm, setConfirm] = useState(false);
  const { user } = useUser();

  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();

  const onSubmitOrder = async () => {
    const { data } = await axios.post("/api/v1/users/userPurchase");

    console.log(data);
    // const cartId = data.user.cart;

    // await axios.patch("/api/v1/carts", { cart, cartId });

    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;
      const carts: CartStateType[] = user.carts;
      console.log(user);

      const findActiveCart = carts.filter((cart) => cart.isActive === true);

      findActiveCart[0].cart.forEach((product: CartItemType) => {
        const { _id, name, price, qty, imgUrl } = product;
        dispatch({
          type: REDUCER_ACTIONS.LOAD,
          payload: { _id, name, price, qty, imgUrl },
        });
      });
    };
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
