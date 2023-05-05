import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cart";
import React, { useContext } from "react";
import { UserContext } from "../context/user";

function Footer() {
 
  const navigate = useNavigate();


  return (
    <div className="footer">
      <Link className="footer__link" to="/">
        Home
      </Link>
    </div>
  );
}
export default Footer;
