import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

function MealItemForm(props) {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  function submitHandler(event) {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    } else if (
      enteredAmount.trim().length > 0 ||
      enteredAmountNumber >= 1 ||
      enteredAmountNumber <= 5
    ) {
      setAmountIsValid(true);
    }
    props.onAddToCart(enteredAmountNumber);
  }
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "0",
          max: "5",
          step: "1",
          defaultValue: "0",
        }}
      />
      <button>Add</button>
      {!amountIsValid ? <p>Please enter a valid amount (1-5)</p> : null}
    </form>
  );
}

export default MealItemForm;
