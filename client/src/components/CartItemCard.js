import { useContext } from 'react'
import { CartContext } from '../context/cart'

function CartItemCard({ item }) {
    // const { cart } = useContext(CartContext)

    return (
        <div className='cart_item_card'>
            <img className='cart-item-image' src={item.toy.img_url} alt={item.toy.name}/>
            <h3>{item.toy.name}</h3>
            <h4>Quantity: {item.quantity}</h4>
            <button>edit selection</button>
        </div>
    )
}
export default CartItemCard