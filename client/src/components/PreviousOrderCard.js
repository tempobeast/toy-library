import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/user'
import { PreviousOrdersContext } from '../context/previousOrders'
import { useParams } from 'react-router-dom'

function PreviousOrdersCard() {

    let params = useParams();
    const { user } = useContext(UserContext)
    const { previousOrders, setPreviousOrders } = useContext(PreviousOrdersContext)
    const [ order, setOrder ] = useState({
        id: "",
        cart_items: [],
        last_update: "",
        status: "",
        total_items: "",
        user: {},
        when_created: ""
    })
    const [ statusSelect, setStatusSelect ] = useState(order.status)
    const [ statusDropdown, setStatusDropdown] = useState(["processing"])

    useEffect(() => {
        fetch(`/previous_orders/${params.orderId}`)
        .then((res) => res.json())
        .then((order) => {
            setOrder(order)
            setStatusSelect(order.status)
        }) 
    }, [setStatusDropdown])

    useEffect(() => {
        fetch('/status_of_orders')
        .then((res) => res.json())
        .then((statusOptions) => {
            statusOptions.shift();
            setStatusDropdown(statusOptions)
        })
    }, [setOrder, setStatusSelect])

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
        fetch(`/previous_orders/${order.id}`, {
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
            setOrder(updatedOrder)
        })
    }

    function formatDates(timestamp) {
        let stamp = new Date(timestamp)
        let formatDate = stamp.toLocaleDateString("en-US", {
            timeZone: "America/Los_Angeles"
        })
        let formatTime = stamp.toLocaleTimeString("en-US", {
            timeZone: "America/Los_Angeles"
        })
        let formattedDate = formatDate + " - " + formatTime
        return formattedDate
    }

    return (
        <div  className="previous-order-card">
            <h1>Order # {order.order_number}</h1>
            <div className='order-header'>
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
            <h4>Submitted: {formatDates(order.when_created)}</h4>
            {order.ship_date ? <h4>Shipped: {formatDates(order.ship_date)}</h4> : null}
            {order.return_date ? <h4>Returned: {formatDates(order.return_date)}</h4> : null}
            {order.restock_date ? <h4>Restocked: {formatDates(order.restock_date)}</h4> : null}
            {user.is_admin && order.status !== "restocked" ?
                <div className='previous-order-button'>
                    <select defaultValue={statusSelect} onChange={(e) => setStatusSelect(e.target.value)}>
                        {statusDropdown.map((orderStatus) => (
                            <option key={orderStatus} value={orderStatus}>{orderStatus}</option>
                        ))}
                    </select>
                    <button onClick={handleOrderUpdateSubmit}>Submit</button>
                </div>
                : null}
        </div>
    )
}
export default PreviousOrdersCard