import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

function Cart(props) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitConfirm, setSubmitConfirm] = useState(false);
  const [error, setError] = useState();

  const cartContext = useContext(CartContext);

  const isValidOrder = cartContext.items.length > 0;

  function cartItemRemoveHandler(id) {
    cartContext.removeItem(id);
  }

  function cartItemAddHandler(item) {
    cartContext.addItem({ ...item, amount: 1 });
  }

  function orderHandler() {
    setShowCheckout(true);
  }

  const handleCheckoutConfirm = async (userData) => {
    const fetchOrders = async () => {
      setIsSubmitting(true);
      const response = await fetch(
        "https://react-http-d74ee-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: cartContext.items,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      setIsSubmitting(false);
      setSubmitConfirm(true);
      cartContext.clearCart();
    };
    fetchOrders().catch((error) => {
      setIsSubmitting(false);
      setError(error.message);
    });
  };

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

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onClickClose} className={classes["button--alt"]}>
        Close
      </button>
      {isValidOrder && (
        <button onClick={orderHandler} className={classes.button}>
          Checkout
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>£{Number(cartContext.totalAmount).toFixed(2)}</span>
        {error && <p>{error}</p>}
      </div>
      {submitConfirm && !error && <p>Order confirmed</p>}
      {showCheckout && (
        <Checkout
          onClickCancel={props.onClickClose}
          onClickConfirm={handleCheckoutConfirm}
        />
      )}
      {!showCheckout && modalActions}
    </>
  );
  const submittingModalContent = <p>Sending order data...</p>;
  const submitConfirmModalContent = (
    <>
      <p>Order successfully sent!</p>
      <button onClick={props.onClickClose} className={classes["button--alt"]}>
        Close
      </button>
    </>
  );

  return (
    <Modal onClick={props.onClickClose}>
      {!isSubmitting && !submitConfirm && cartModalContent}
      {isSubmitting && !submitConfirm && submittingModalContent}
      {submitConfirm && submitConfirmModalContent}
    </Modal>
  );
}

export default Cart;

//passed up to
