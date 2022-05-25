import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const postCodeIsValid = (value) =>
  value.trim().length > 5 && value.trim().length < 7;

function Checkout(props) {
  const [formInputValid, setFormInputValid] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  function confirmHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameValid = !isEmpty(enteredName);
    const enteredStreetValid = !isEmpty(enteredStreet);
    const enteredPostalValid = postCodeIsValid(enteredPostal);
    const enteredCityValid = !isEmpty(enteredCity);

    setFormInputValid({
      name: enteredNameValid,
      street: enteredStreetValid,
      postal: enteredPostalValid,
      city: enteredCityValid,
    });

    const formIsValid =
      enteredNameValid &&
      enteredStreetValid &&
      enteredPostalValid &&
      enteredCityValid;

    if (!formIsValid) {
      return;
      //show error
    } // else submit cart data

    props.onClickConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
  }

  const nameControlClasses = `${classes.control} ${
    formInputValid.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputValid.street ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    formInputValid.postal ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputValid.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formInputValid.name && <p>Please input a name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formInputValid.street && <p>Please input a street</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInputRef} type="text" id="name" />
        {!formInputValid.postal && <p>Please input a valid postcode</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formInputValid.city && <p>Please input a city</p>}
      </div>
      <div className={classes.actions}>
        <button onClick={props.onClickCancel} type="button">
          Cancel
        </button>
        <button onClick={props.onClickConfirm}>Confirm</button>
      </div>
    </form>
  );
}

export default Checkout;
