import { useContext, useState } from 'react'
import { UserContext } from '../context/user'
import { PreviousOrdersContext } from '../context/previousOrders'

function PreviousOrdersCard({ order }) {
    const { user } = useContext(UserContext)
    const { previousOrders, setPreviousOrders } = useContext(PreviousOrdersContext)
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

    console.log(order)

    return (
        <div key={order.id} className="previous-order-card">
            <div className='order-header'>
                <h3>Order #: {order.id}</h3>
                {user.is_admin ? <h3>User: {order.user.username}</h3> : null}
            </div>
            <h3 className="previous-card-titles">Order Status: </h3>
            <h3 className="previous-card-titles" style={{color: orderStatusColor(order.status)}}>{order.status}</h3>
            {order.cart_items.map((item) => {
                return (
                <div key={item.id} className="previous-order-item">
                    {item.toy ? <img src={item.toy.img_url} alt={item.toy.name} className='cart-item-image'/> : null}
                    {item.toy ? <p>{item.toy.name}</p> : <p>Toy removed from stock</p>}
                    <p>{item.quantity}</p>
                </div>
                )
            })}
            <h4>Order submitted: {order.when_created}</h4>
            {order.status === "processing" ? null : <h4>Order {order.status}: {order.last_update}</h4>}
            {user.is_admin && order.status !== "restocked" ? 
                <div className='previous-order-button'>
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