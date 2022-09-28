import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user";
import { CartContext } from "../context/cart";
import { PreviousOrdersContext } from "../context/previousOrders";
import "../App.css";

function Nav() {
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
        navigate("/home");
      }
    });
  }

  if (user) {
    return (
      <div id="nav">
        {user.is_admin ? (
        <NavLink to="manage_users" className="nav-link">
          Manage Users
        </NavLink>
        ) : null}
        <NavLink to="view_toys" className="nav-link">
          View Toys
        </NavLink>
        {user.is_admin ? (
          <NavLink to="add_toy" className="nav-link">
            Add Toy
          </NavLink>
        ) : null}
        {user.is_admin ? (
          <NavLink to="view_orders" className="nav-link">
            View Orders
          </NavLink>
        ) : null}
        <NavLink to={`user_profiles/${user.id}`} className="nav-link">
          My Account
        </NavLink>
        <button onClick={handleLogout} className="nav-link">
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <div id="nav">
        <NavLink to="/view_toys" className="nav-link">
          View Toys
        </NavLink>
        <NavLink to="/user_login" className="nav-link">
          Login
        </NavLink>
      </div>
    );
  }
}

export default Nav;
