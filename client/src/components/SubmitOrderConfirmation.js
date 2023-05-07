import { useContext, useState } from "react";
import { CartContext } from "../context/cart";
import { PreviousOrdersContext } from "../context/previousOrders";
import { UserContext } from "../context/user";
import CartItemCard from "./CartItemCard";
import AddressForm from "./AddressForm";
import { useNavigate } from "react-router-dom";

function SubmitOrderConfirmation({ setSubmitClick, handleCancelOrderClick }) {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { previousOrders, setPreviousOrders } = useContext(
    PreviousOrdersContext
  );
  const [editAddress, setEditAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function handleConfirmSubmitCartClick(e) {
    setErrors([]);
    setIsLoading(true);
    fetch(`/shopping_sessions/${cart.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "processing" }),
    }).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        res.json().then((data) => {
          const order = data[0];
          setPreviousOrders([order, ...previousOrders]);
          const newCart = data[1];
          setCart(newCart);
          setSubmitClick(false);
          navigate(`/user_profiles/${user.id}`);
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
      <div className="order-confirmation__card">
        <h2>Order Confirmation</h2>
        {cart.cart_items.map((item) => (
          <CartItemCard id="order-confirmation" key={item.id} item={item} />
        ))}
        {user.user_address ? (
          <>
            <hr />
            <p className="order-confirmation-shipping">
              Ship to: {user.user_address.street}, {user.user_address.city},{" "}
              {user.user_address.state} {user.user_address.zip}{" "}
            </p>
            <p id="edit-address" onClick={() => setEditAddress(true)}>
              Edit Shipping Information
            </p>
          </>
        ) : (
          <AddressForm
            editAddress={editAddress}
            setEditAddress={setEditAddress}
          />
        )}
        {editAddress ? (
          <AddressForm
            editAddress={editAddress}
            setEditAddress={setEditAddress}
          />
        ) : null}
        <br />
        <button
          id="order-confirmation-button"
          onClick={handleConfirmSubmitCartClick}
        >
          {isLoading ? "Loading..." : "Submit Order"}
        </button>
        <button id="order-confirmation-button" onClick={handleCancelOrderClick}>
          Cancel Order
        </button>
        {errors ? errors.map((err) => <p key={err}>{err}</p>) : null}
        <br />
        <button
          id="order-confirmation-button"
          onClick={() => setSubmitClick(false)}
        >
          Back
        </button>
      </div>
  );
}
export default SubmitOrderConfirmation;
