import { useContext, useState } from 'react'
import { UserContext } from '../context/user'
import { ToysContext } from '../context/toys'
import { PreviousOrdersContext } from '../context/previousOrders'

function PreviousOrdersCard({ order }) {
    const { user } = useContext(UserContext)
    const { previousOrders, setPreviousOrders } = useContext(PreviousOrdersContext)
    const { setToys } = useContext(ToysContext)
    const [ statusSelect, setStatusSelect ] = useState(order.status) 

    function orderStatusColor(status) {
        if (status === "processing"){
            return "blue"
        } else if (status === "shipped") {
            return "green"
        } else if (status === "returned") {
            return "red"
        }else {
            return "black"
        }
    }

    function handleOrderUpdateSubmit(e) {
        fetch(`/shopping_sessions/${order.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({status: statusSelect})
        })
        .then((res) => res.json())
        .then((updatedOrder) => {
            const updatedOrders = previousOrders.filter((prevOrder) => prevOrder.id !== updatedOrder.id);
            setPreviousOrders([ ...updatedOrders, updatedOrder ])
        })
    }

    return (
        <div key={order.id} className="previous-order-card">
            <h3>Order #: {order.id}</h3>
            <h3 className="previous-card-titles">Order Status: </h3>
            <h3 className="previous-card-titles" style={{color: orderStatusColor(order.status)}}>{order.status}</h3>
            {order.cart_items.map((item) => {
                return (
                <div key={item.id} className="previous-order-item">
                    <img src={item.toy.img_url} alt={item.toy.name} className='cart-item-image'/>
                    <p>{item.toy.name}</p>
                    <p>{item.quantity}</p>
                </div>
                )
            })}
            <h4>Order submitted: {order.when_created}</h4>
            {order.status === "processing" ? null : <h4>Order {order.status}: {order.last_update}</h4>}
            {user.is_admin ? 
                <div>
                    <select defaultValue={statusSelect} onChange={(e) => setStatusSelect(e.target.value)}>
                        <option value="processing" >processing</option>
                        <option value="shipped">shipped</option>
                        <option value="returned">returned</option>
                        <option value="restocked">restocked</option>
                    </select>
                    <button onClick={handleOrderUpdateSubmit}>Submit</button>
                </div>
                : null}
        </div>
    )
}
export default PreviousOrdersCard