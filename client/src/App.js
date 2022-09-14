import './App.css';
import React, { useEffect, useContext} from "react"
import { Routes, Route, withRouter } from 'react-router-dom';
import ToyContainer from './components/ToyContainer';
import LoginPage from './components/LoginPage';
import Header from './components/Header'
import Nav from './components/Nav';
import Home from './components/Home'
import UserProfile from './components/UserProfile';
import CartPage from './components/CartPage'
import UpdateUserInfo from './components/UpdateUserInfo';
import ToyPage from './components/ToyPage';
import { UserContext } from "./context/user";
import { ToysContext } from './context/toys';
import { CartContext } from './context/cart';
import { PreviousOrdersContext } from './context/previousOrders'

function App() {

  const { cart, setCart} = useContext(CartContext)
  const { user, setUser } = useContext(UserContext);
  const { toys, setToys } = useContext(ToysContext)
  const { setPreviousOrders } = useContext(PreviousOrdersContext)

  useEffect(() => {
    fetch("/me")
    .then((res) => res.json())
    .then((data) => {
      const currentUser = data[0]
      setUser(currentUser)
      const currentCart = data[1]
      setCart(currentCart)
    })
  }, [setCart, setUser])

  useEffect(() => {
    fetch("/toys")
      .then((res) => res.json())
      .then((data) => setToys(data))
  }, [setToys])

  useEffect(() => {
    fetch("/shopping_sessions")
      .then((res) => res.json())
      .then((orders) => setPreviousOrders(orders))
  }, [setPreviousOrders])

  if (!user) {
    return (
      <div>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="user_login" element={<LoginPage/>}/>
          {/* <Route path="/view_all_toys" element={<ToyContainer/>}/> */}
          <Route path="/view_toys/:toyId" element={<ToyPage />} />

          <Route path="view_toys" element={<ToyContainer />}/>
        </Routes>
      </div>
    )
  } else {

    return (
        <div className="App">
          <Header cart={cart} user={user}/>
          <Nav />
          <Routes>
            <Route path="view_toys/:toyId" element={<ToyPage />} />
            {/* <Route path="/view_all_toys" element={<ToyContainer/>}/> */}
            <Route path="view_toys" element={<ToyContainer/>}>
              {/* <Route path=":toyId" element={<ToyPage />}/> */}
            </Route>
            <Route path="user_profiles/:id" element={<UserProfile/>} />
            <Route path="cart" element={<CartPage />} />
            <Route path="update_user" element={<UpdateUserInfo />} />
            <Route path="/" element={<Home/>} />
          </Routes>
        </div>
    )
  };
}

export default App;
