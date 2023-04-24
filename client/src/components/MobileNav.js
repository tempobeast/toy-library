import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user";
import { CartContext } from "../context/cart";
import { PreviousOrdersContext } from "../context/previousOrders";
import "../App.css";

function MobileNav({openNav, setOpenNav}) {
  const { user, setUser } = useContext(UserContext);
  const { setCart } = useContext(CartContext);
  const { setPreviousOrders } = useContext(PreviousOrdersContext);
  const navigate = useNavigate();

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((res) => {
      if (res.ok) {
        setUser(null);
        setCart(null);
        setPreviousOrders([]);
        setOpenNav(!openNav)
        navigate("/");
      }
    });
  }

  if (user) {
    return (
      <div id="mobile-nav">
        {user.is_admin ? (
        <NavLink to="manage_users" className="mobile__nav-link" onClick={() => setOpenNav(!openNav)}>
          Manage Users
        </NavLink>
        ) : null}
        <NavLink to="view_toys" className="mobile__nav-link" onClick={() => setOpenNav(!openNav)}>
          View Toys
        </NavLink>
        {user.is_admin ? (
          <NavLink to="add_toy" className="mobile__nav-link" onClick={() => setOpenNav(!openNav)}>
            Add Toy
          </NavLink>
        ) : null}
        {user.is_admin ? (
          <NavLink to="view_orders" className="mobile__nav-link" onClick={() => setOpenNav(!openNav)}>
            View Orders
          </NavLink>
        ) : null}
        <NavLink to={`user_profiles/${user.id}`} className="mobile__nav-link" onClick={() => setOpenNav(!openNav)}>
          My Account
        </NavLink>
        <button onClick={handleLogout} className="mobile__nav-logout" >
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <div id="mobile-nav">
        {/* <button className="toggle-button">
          <span className="toggle-button__bar"></span>
          <span className="toggle-button__bar"></span>
          <span className="toggle-button__bar"></span>
        </button> */}
        <NavLink to="/view_toys" className="mobile__nav-link">
          View Toys
        </NavLink>
        <NavLink to="/user_login" className="mobile__nav-link">
          Login
        </NavLink>
      </div>
    );
  }
}

export default MobileNav;
