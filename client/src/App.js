import "./App.css";
import React, { useEffect, useContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ToyContainer from "./components/ToyContainer";
import LoginPage from "./components/LoginPage";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import CartPage from "./components/CartPage";
import UpdateUserInfo from "./components/UpdateUserInfo";
import ToyPage from "./components/ToyPage";
import AddToy from "./components/AddToy";
import UserList from "./components/UserList";
import PreviousOrderCard from "./components/PreviousOrderCard";
import { UserContext } from "./context/user";
import { ToysContext } from "./context/toys";
import { CartContext } from "./context/cart";
import { PreviousOrdersContext } from "./context/previousOrders";
import OrdersContainer from "./components/OrdersContainer";
import Footer from "./components/Footer";

function App() {
  const { cart, setCart } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);
  const { setToys } = useContext(ToysContext);
  const { previousOrders, setPreviousOrders } = useContext(
    PreviousOrdersContext
  );
  const [ errors, setErrors ] = useState("")

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          const currentUser = data[0];
          setUser(currentUser);
          const currentCart = data[1];
          setCart(currentCart);
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });
  }, [setCart]);

  useEffect(() => {
    fetch("/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, [previousOrders]);

  useEffect(() => {
    fetch("/previous_orders")
      .then((res) => res.json())
      .then((orders) => {
        setPreviousOrders(orders)
    });
  }, [user]);


  if (!user) {
    return (
      <div className="no-user App">
        <Header className="header"/>
        <Nav className="nav"/>
          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="user_login" element={<LoginPage />} />
            <Route path="view_toys/:toyId" element={<ToyPage />} />
            <Route path="view_toys" element={<ToyContainer />} />
          </Routes>
          <Footer className="footer"/>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Header className="header" cart={cart} user={user} />
        <Nav className="nav"/>
          <Routes className="main">
            <Route path="view_toys/:toyId" element={<ToyPage />} />
            <Route path="view_toys" element={<ToyContainer />}>
            </Route>
            <Route path="user_profiles/:id" element={<UserProfile />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="update_user" element={<UpdateUserInfo />} />
            <Route
              path="add_toy"
              element={
                user.is_admin ? <AddToy /> : <Navigate replace to={"/"} />
              }
            />
            <Route
              path="manage_users"
              element={
                user.is_admin ? <UserList /> : <Navigate replace to={"/"} />
              }
            />
            <Route
              path="view_orders"
              element={
                  <OrdersContainer />
              }
            />
            <Route
              path="update_toy/:toyId"
              element={
                user.is_admin ? <AddToy /> : <Navigate replace to={"/"} />
              }
            />
            <Route
              path="view_orders/:orderId"
              element = {
                <PreviousOrderCard />
              }
            />
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer className="footer"/>
      </div>
    );
  }
}

export default App;
