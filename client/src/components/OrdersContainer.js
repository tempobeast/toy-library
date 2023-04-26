import React, { useContext, useState } from "react";
import PreviousOrdersCard from "./PreviousOrderCard";
import { PreviousOrdersContext } from "../context/previousOrders";

function OrdersContainer() {
  const { previousOrders } = useContext(PreviousOrdersContext);
  const [ filterStatus, setFilterStatus ] = useState("all")

  const sortOrders = previousOrders.sort((a, b) => a.id < b.id ? 1 : a.id > b.id ? -1 : 0)

  const filterOrders = sortOrders.filter((order) => {
    if (filterStatus === "all") {
      return true
    } else {
      return order.status === filterStatus
    }
  })

  return (
    <div className="content">
      <h1>Orders</h1>
      <label>filter by status:
        <select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">all</option>
          <option value="processing">processing</option>
          <option value="shipped">shipped</option>
          <option value="returned">returned</option>
          <option value="restocked">restocked</option>
        </select>
      </label>
      {filterOrders.map((order) => (
        <PreviousOrdersCard order={order} key={order.id} />
      ))}
    </div>
  );
}

export default OrdersContainer;
