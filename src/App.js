import React, { useState } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [showCart, setShowCart] = useState(false);

  function handleOpenCart() {
    setShowCart(true);
  }

  function handleCloseCart() {
    setShowCart(false);
  }

  return (
    <CartProvider>
      {showCart && <Cart onClickClose={handleCloseCart} />}
      <Header onClick={handleOpenCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
