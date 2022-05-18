import React, { useContext } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

function Cart(props) {
  const cartContext = useContext(CartContext);

  const isValidOrder = cartContext.items.length > 0;

  function cartItemRemoveHandler(id) {
    cartContext.removeItem(id);
  }

  function cartItemAddHandler(item) {
    cartContext.addItem({ ...item, amount: 1 });
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );
  return (
    <Modal onClick={props.closeOnClick}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>£{Number(cartContext.totalAmount).toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.closeOnClick} className={classes["button--alt"]}>
          Close
        </button>
        {isValidOrder && (
          <button onClick={props.checkoutOnClick} className={classes.button}>
            Checkout
          </button>
        )}
      </div>
    </Modal>
  );
}

export default Cart;
