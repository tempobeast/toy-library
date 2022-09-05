import { useContext, useState } from 'react'
import { CartContext } from '../context/cart'
import { PreviousOrdersContext } from '../context/previousOrders'
import CartItemCard from './CartItemCard'

function CartPage() {
    const { cart, setCart } = useContext(CartContext)
    const {previousOrders, setPreviousOrders} = useContext(PreviousOrdersContext)


    console.log(cart)

    function handleSubmitCartClick(e) {
        fetch(`/shopping_sessions/${cart.id}`, {
            method: 'PATCH', 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({status: "processing"})
        })
        .then((res) => res.json())
        .then((data) => {
            const order = data[0];
            setPreviousOrders([...previousOrders, order]);
            const newCart = data[1];
            setCart(newCart)
        })
    }

    return (
        <div>
            {cart.cart_items.map((item) => <CartItemCard key={item.id} item={item}/>)}
            <button onClick={handleSubmitCartClick}>Submit Order</button>
            <button>Cancel Order</button>
        </div>
    )
}
export default CartPage