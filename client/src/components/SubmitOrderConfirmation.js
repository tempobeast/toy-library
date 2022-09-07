import { useContext, useState } from 'react'
import { CartContext } from '../context/cart'
import { PreviousOrdersContext } from '../context/previousOrders'
import { UserContext } from '../context/user'
import CartItemCard from './CartItemCard'
import AddressForm from './AddressForm'
import { useNavigate } from 'react-router-dom'

function SubmitOrderConfirmation({setSubmitClick}) {

    const { cart, setCart } = useContext(CartContext)
    const { user } = useContext(UserContext)
    const { previousOrders, setPreviousOrders } = useContext(PreviousOrdersContext)
    const [editAddress, setEditAddress] = useState(false)
    const navigate = useNavigate()

    function handleConfirmSubmitCartClick(e) {
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
            setSubmitClick(false)
            navigate(`/user_profiles/${user.id}`)
        })
    }

   
    return (
        <div className='order-confirmation'>
            <h2>Order Confirmation</h2>
            {cart.cart_items.map((item) => <CartItemCard key={item.id} item={item}/>)}
            {user.user_address ? 
                <>
                    <p>Ship to: {user.user_address.street}, {user.user_address.city}, {user.user_address.state} {user.user_address.zip} </p>
                    <button onClick={() => setEditAddress(true)}>Edit Shipping Information</button>
                </>
                :
                <AddressForm editAddress={editAddress} setEditAddress={setEditAddress} />
            }
            {editAddress ? <AddressForm editAddress={editAddress} setEditAddress={setEditAddress}/> : null}
            <br/>
            <button onClick={handleConfirmSubmitCartClick}>Submit Order</button>
            <button>Cancel Order</button>
            <br/>
            <button onClick={() => setSubmitClick(false)}>Back</button>
        </div>
    )
}
export default SubmitOrderConfirmation