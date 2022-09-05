import { useContext, useState } from 'react'
import { UserContext } from '../context/user'
import { PreviousOrdersContext } from '../context/previousOrders'

import CartItemCard from './CartItemCard'

function PreviousOrdersCard() {
    const {user} = useContext(UserContext)
    const { previousOrders } = useContext(PreviousOrdersContext)


    return (
        <div>
            {previousOrders.map((order) => {
                return (
                <div key={order.id}>
                    {order.cart_items.map((item) => {
                        return (
                        <div key={item.id}>
                            <p>{item.toy.name}</p>
                            <p>{item.quantity}</p>
                        </div>
                        )
                    })}
                    <h3>{order.status}</h3>
                </div>
                )
            })}
        </div>
    )
}
export default PreviousOrdersCard