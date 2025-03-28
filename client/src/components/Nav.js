import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { CartContext } from "../context/cart";
import { PreviousOrdersContext } from "../context/previousOrders";
import "../App.css";
import MobileNav from "./MobileNav";

function Nav() {
  const { user, setUser } = useContext(UserContext);
  const { setCart } = useContext(CartContext);
  const { setPreviousOrders } = useContext(PreviousOrdersContext);
  const navigate = useNavigate();
  const [ openNav, setOpenNav ] = useState(false)

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((res) => {
      if (res.ok) {
        setUser(null);
        setCart(null);
        setPreviousOrders([]);
        navigate("/");
      }
    });
  }

  if (user) {
    return (
      <div id="nav">
        <button onClick={() => setOpenNav(!openNav)} className="toggle-button">
          <span className="toggle-button__bar"></span>
          <span className="toggle-button__bar"></span>
          <span className="toggle-button__bar"></span>
        </button>
        {user.is_admin ? (
        <NavLink to="manage_users" className="main__nav-link" >
          Manage Users
        </NavLink>
        ) : null}
        <NavLink to="view_toys" className="main__nav-link" >
          View Toys
        </NavLink>
        {user.is_admin ? (
          <NavLink to="add_toy" className="main__nav-link">
            Add Toy
          </NavLink>
        ) : null}
          <NavLink to="view_orders" className="main__nav-link">
            View Orders
          </NavLink>
        <NavLink to={`user_profiles/${user.id}`} className="main__nav-link">
          My Account
        </NavLink>
        <button onClick={handleLogout} className="main__nav-logout">
          Logout
        </button>
        {openNav ? <MobileNav setOpenNav={setOpenNav} openNav={openNav}/> : null}
        {openNav ? <div onClick={() => setOpenNav(!openNav)} className="backdrop"></div> : null}
      </div>
    );
  } else {
    return (
      <div id="nav" className="no-login">
        <NavLink to="/view_toys" className="main__nav-link no-login">
          View Toys
        </NavLink>
        <NavLink to="/user_login" className="main__nav-link no-login">
          Login
        </NavLink>
      </div>
    );
  }
}

export default Nav;
