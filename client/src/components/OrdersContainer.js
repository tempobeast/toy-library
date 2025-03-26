import React, { useContext, useState, useEffect } from "react";
import { PreviousOrdersContext } from "../context/previousOrders";
import OrderList from "./OrderList";
import { UserContext } from "../context/user";

function OrdersContainer() {
  const { previousOrders } = useContext(PreviousOrdersContext);
  const [ filterStatus, setFilterStatus ] = useState("all")
  const [ search, setSearch ] = useState("");
  const [ dropdownOptions, setDropdownOptions ] = useState(['all'])
  const { user } = useContext(UserContext);

  const sortOrders = previousOrders.sort((a, b) => a.id < b.id ? 1 : a.id > b.id ? -1 : 0)

  useEffect(() => {
    fetch('/status_of_orders')
    .then((res) => res.json())
    .then((statusArray) => 
      setDropdownOptions(statusArray))
  }, [])

  function handleSearchChange(e) {
    setSearch(e)
  }

  const filterOrders = sortOrders.filter((order) => {
    if (filterStatus === "all") {
      return true
    } else {
      return order.status === filterStatus
    }
  })
  const searchOrders = filterOrders.filter((order) => {
    if(search === "") {
      return true
    } else if (order.user.username.toLowerCase().includes(search.toLowerCase())) {
      return true
    } else {
      return false
    }
  })
  
  return (
    <div className="content">
      {user.is_admin ? <h1>Orders</h1> : <h1>{`${user.username}'s Orders`}</h1>}
      <div className="order_container_filters"> 
        <label>filter by status:
          <select onChange={(e) => setFilterStatus(e.target.value)}>
            {dropdownOptions.map((dropdown) => (
              <option key={dropdown} value={dropdown}>{dropdown}</option>
            ))}
          </select>
        </label>
        {user.is_admin ? 
          <label className="order_search_label">Search by username:
            <input type="text" className="order_search_bar" value={search} onChange={(e) => handleSearchChange(e.target.value)}></input>
          </label>
        : null}
      </div>
      <table className="orders_table">
        <thead>
          <tr className="orders_table_row">
            <th>Order No.</th>
            <th>Submit Date</th>
            <th>Customer</th>
            <th>Item Quantity</th>
            <th>Order Status</th>
            <th>Status Change Date</th>
          </tr>
        </thead>
        <tbody className="orders_table">
          {searchOrders.map((order) => (
              <OrderList order={order} key={order.id} />
          ))}
          
        </tbody>
      </table>
      {searchOrders.length > 0 ? null : <p>Search returned no results...</p>}
    </div>
  );
}

export default OrdersContainer;
