import React, { useContext } from 'react'
import PreviousOrdersCard from './PreviousOrderCard'
import { PreviousOrdersContext } from '../context/previousOrders'

function OrdersContainer() {
    const { previousOrders } = useContext(PreviousOrdersContext)

    return (
        <div>
            <h1>Orders</h1>
            {previousOrders.map((order) => <PreviousOrdersCard order={order} key={order.id}/>)}
        </div>
    )
}

export default OrdersContainer