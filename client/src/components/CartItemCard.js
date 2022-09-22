import { useContext } from "react";
import { CartContext } from "../context/cart";

function CartItemCard({ item, id }) {
  const { cart } = useContext(CartContext);

  return (
    <div
      className={
        cart.cart_items[cart.cart_items.length - 1].id === item.id
          ? "last-cart-item"
          : "cart-item-card"
      }
    >
      <img
        className="cart-item-image"
        src={item.toy.img_url}
        alt={item.toy.name}
      />
      <h3>{item.toy.name}</h3>
      <h4>Quantity: {item.quantity}</h4>
      {id === "order-confirmation" ? null : (
        <button className="cart-item-card-button">edit selection</button>
      )}
    </div>
  );
}
export default CartItemCard;
