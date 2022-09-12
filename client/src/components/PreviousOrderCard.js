import { useContext } from 'react'
import { PreviousOrdersContext } from '../context/previousOrders'

function PreviousOrdersCard() {
    const { previousOrders } = useContext(PreviousOrdersContext)

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

    function orderStatusTag(status) {
        if (status === "shipped") {
            return "shipped"
        } else if (status === "returned") {
            return "returned"
        }
    }



    return (
        <div>
            {previousOrders.map((order) => {
                return (
                <div key={order.id} className="previous-order-card">
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
                    {order.status !== "processing" ? <h4>Order {orderStatusTag(order.status)}: {order.last_update}</h4> : null}
                </div>
                )
            })}
        </div>
    )
}
export default PreviousOrdersCard