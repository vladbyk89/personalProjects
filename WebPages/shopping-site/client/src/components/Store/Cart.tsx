import useCart from "../../hooks/useCart";
import EmptyCart from "./EmptyCart";
import { useState } from "react";
import CartItem from "./CartItem";
import "../../styles/Cart.scss";

const Cart = () => {
  const [confirm, setConfirm] = useState(false);

  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();
  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };

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
