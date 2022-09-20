import '../App.css';
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/cart';
import React, { useContext } from 'react';
import { UserContext } from '../context/user';


function Header() {

    const { user } = useContext(UserContext)
    const { cart } = useContext(CartContext)
    const navigate = useNavigate()
    
    function handleCartClick(e) {
        e.stopPropagation()
        navigate('/cart')
    }

    return (
        <div id="header">
            <Link to="/" id="logo">
                <h1>Library of Toys</h1>
            </Link>
                {
                user && user.is_admin ?
                null :
                user ? 
                <h2 onClick={handleCartClick} id="cart-thumb">{`🛒 ${cart.total_items} items`}</h2> 
                : 
                <h2 id="cart-thumb" onClick={() => navigate('/user_login')}>Signup/login</h2>
                }
        </div>
    )
}
export default Header