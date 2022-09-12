import React, { useContext, useState } from 'react'
import { CartContext } from '../context/cart'
import { PreviousOrdersContext } from '../context/previousOrders'
import CartItemCard from './CartItemCard'
import SubmitOrderConfirmation from './SubmitOrderConfirmation'

function CartPage() {
    const { cart, setCart } = useContext(CartContext)
    const {previousOrders, setPreviousOrders} = useContext(PreviousOrdersContext)
    const [submitClick, setSubmitClick] = useState(false)


    return (
        <div className='cart-page'>
        {cart.total_items < 1 ? 
            <h3>Your Cart is Empty</h3> 
            :
            <>
            {submitClick ? <SubmitOrderConfirmation setSubmitClick={setSubmitClick}/> : null}
            <div className={submitClick ? 'inactive-cart-items' :'all-cart-items'}>
                {cart.cart_items.map((item) => <CartItemCard key={item.id} item={item}/>)}
            </div>
            <button onClick={() => setSubmitClick(true)}>Confirm Order</button>
            <button>Cancel Order</button>
            </>
        }
        </div>
        
    )
}
export default CartPage