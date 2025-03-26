import { useContext, useState } from 'react'
import { UserContext } from '../context/user'
import { useNavigate } from "react-router-dom";
import { PreviousOrdersContext } from '../context/previousOrders'

function OrderList({ order }) {
    const navigate = useNavigate()
    const { user } = useContext(UserContext);
    const { previousOrders, setPreviousOrders } = useContext(PreviousOrdersContext);
    const [ statusSelect, setStatusSelect ] = useState(order.status);
    

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

    function handleRowClick(e) {
        navigate(`/view_orders/${order.id}`);
    }

    function getOrderStatusDate(orderStatus) {
        if(orderStatus === "processing") {
            return order.when_created
        } else if (orderStatus === "shipped") {
            return formatDates(order.ship_date)
        } else if (orderStatus === "returned") {
            return formatDates(order.return_date)
        } else if (orderStatus === "restocked") {
            return formatDates(order.restock_date)
        }
    }
    
    
    return (
        <tr onClick={handleRowClick} className="orders_table_row" key={order.id}>
            <td>{order.order_number}</td>
            <td>{formatDates(order.when_created) + " PST"}</td>
            <td>{order.user.username}</td>
            <td>{order.total_items}</td>
            <td style={{color: orderStatusColor(order.status)}}>{order.status}</td>
            <td>{getOrderStatusDate(order.status)}</td>
          </tr>
        
    )
}
export default OrderList