import React, { useContext, useState } from "react";
import { CartContext } from "../context/cart";
import { ToysContext } from "../context/toys";
import CartItemCard from "./CartItemCard";
import SubmitOrderConfirmation from "./SubmitOrderConfirmation";

function CartPage() {
  const { cart, setCart } = useContext(CartContext);
  const { toys, setToys } = useContext(ToysContext);
  const [submitClick, setSubmitClick] = useState(false);
  const [errors, setErrors] = useState(null);

  function handleCancelOrderClick(e) {
    fetch(`/cancel_shopping_session/${cart.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        res.json().then((toys) => {
          setToys(toys);
          setCart({ ...cart, cart_items: [], total_items: 0 });
        });
      } else {
        res.json().then((err) => setErrors(err));
      }
    });
  }

  return (
    <div className="cart-page content">
      {cart.total_items < 1 ? (
        <h3>Your Cart is Empty</h3>
      ) : (
        <>
          {submitClick ? (
            <div>
              <SubmitOrderConfirmation
                setSubmitClick={setSubmitClick}
                handleCancelOrderClick={handleCancelOrderClick}
              />
              <div onClick={() => setSubmitClick(false)} className="backdrop"></div>
            </div>
          ) : null}
          <div
            className={submitClick ? "inactive-cart-items" : "all-cart-items"}
          >
            {cart.cart_items.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}
          </div>
          <div className="cart-page__buttons">
            <button className="cart-page__button" onClick={() => setSubmitClick(true)}>Confirm Order</button>
            <button className="cart-page__button" onClick={handleCancelOrderClick}>Cancel Order</button>
          </div>
        </>
      )}
    </div>
  );
}
export default CartPage;
