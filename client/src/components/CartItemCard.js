import { useContext } from 'react'
import { CartContext } from '../context/cart'

function CartItemCard({ item }) {
    const { cart } = useContext(CartContext)

    console.log(cart.cart_items[cart.cart_items.length - 1].id)


    return (
        <div className={cart.cart_items[cart.cart_items.length - 1].id === item.id ? 'last-cart-item' : 'cart-item-card'}>
            <img className='cart-item-image' src={item.toy.img_url} alt={item.toy.name}/>
            <h3>{item.toy.name}</h3>
            <h4>Quantity: {item.quantity}</h4>
            <button className='cart-item-card-button'>edit selection</button>
        </div>
    )
}
export default CartItemCard