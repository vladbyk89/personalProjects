import EmptyCart from "./EmptyCart";
import { useState, useEffect } from "react";
import CartItem from "./CartItem";
import "../../styles/Cart.scss";
import axios from "axios";
import { CartItemType, CartStateType } from "../../context/CartProvider";
import { UserType } from "../../App";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHook";

import { submitCart, loadItems, selectCart } from "../../app/cartSlice";

const Cart = () => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [confirm, setConfirm] = useState(false);

  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const totalItems: number = cart.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.qty;
  }, 0);

  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    cart.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.qty * cartItem.price;
    }, 0)
  );

  const onSubmitOrder = async () => {
    if (!currentUser) return alert("please login first");
    await axios.post("/api/v1/users/userPurchase", { userId: currentUser._id });

    dispatch(submitCart());
    setConfirm(true);
  };

  useEffect(() => {
    const fetchCart = async () => {
      const { data } = await axios.get("api/v1/users/getUser");

      const user = await data.user;

      if (!user) return;

      setCurrentUser(user);

      const carts: CartStateType[] = user.carts;

      const findActiveCart = carts.filter((cart) => cart.isActive === true);

      if (findActiveCart.length) {
        findActiveCart[0].cart.forEach((product: CartItemType) => {
          const { _id, name, price, qty, imgUrl } = product;
          // dispatch({
          //   type: REDUCER_ACTIONS.LOAD,
          //   payload: { _id, name, price, qty, imgUrl },
          // });
          dispatch(loadItems({ _id, name, price, qty, imgUrl }));
        });
      }
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
        {cart.cart.map((item) => (
          <CartItem
            key={item._id}
            item={item}
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
