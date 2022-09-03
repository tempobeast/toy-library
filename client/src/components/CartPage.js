import { useContext } from 'react'
import { CartContext } from '../context/cart'
import CartItemCard from './CartItemCard'

function CartPage() {
    const { cart } = useContext(CartContext)
    console.log(cart)

    function handleSubmitCartClick(e) {
        
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