import { CartItemType } from "../../context/CartProvider";
import { ReducerAction } from "../../context/CartProvider";
import { ReducerActionType } from "../../context/CartProvider";

interface CartItemProps {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
}

const CartItem = ({ item, dispatch, REDUCER_ACTIONS }: CartItemProps) => {
  const img: string = new URL(`${item.imgUrl}`, import.meta.url)
    .href;

  const lineTotal: number = item.qty * item.price;

//   const highestQty: number = 20 > item.qty ? 20 : item.qty;

//   const optionValues: number[] = [...Array(highestQty).keys()].map(
//     (i) => i + 1
//   );

//   const options: ReactElement[] = optionValues.map((val) => (
//     <option key={`opt${val}`} value={val}>
//       {val}
//     </option>
//   ));

//   const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
//     dispatch({
//       type: REDUCER_ACTIONS.QUANTITY,
//       payload: { ...item, qty: Number(e.target.value) },
//     });
//   };

  const onRemoveFromCart = () =>
    dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: item });

  const content = (
    <li className="cartItem">
      <img src={img} alt={item.name} className="cart__img" />
      <div aria-label="Item name">{item.name}</div>
      <div className="itemAmount">Quantity: {item.qty}</div>
      {/* <div aria-label="Price per item">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.price)}
      </div> */}
      {/* <label htmlFor="itemQty" className="offscreen">
        Item Quantity
      </label> */}
      {/* <select
        name="itemQty"
        id="itemQty"
        className="cart__select"
        value={item.qty}
        aria-label="Item quantity"
        onChange={onChangeQty}
      >
        {options}
      </select> */}
      <div className="cart__item-subtotal" aria-label="Line item subtotal">
        total: {" "}
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(lineTotal)}
      </div>
      <button
        className="button-6"
        aria-label="Remove item from cart"
        title="Remove item from cart"
        onClick={onRemoveFromCart}
      >
        Remove 
      </button>
    </li>
  );
  return content;
};

export default CartItem;
