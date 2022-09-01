import '../App.css';
import { Link, useNavigate } from 'react-router-dom'
// import { UserContext } from '../context/user'
import { CartContext } from '../context/cart';
import { useContext } from 'react';


function Header() {

    // const { user } = useContext(UserContext)
    const { cart } = useContext(CartContext)
    const navigate = useNavigate()
    
    function handleCartClick(e) {
        e.stopPropagation()
        navigate('/cart')
    }

    return (
        <div id="header">
            <Link to="/">
                <h1>Library of Toys</h1>
            </Link>
            {/* <Link to="/cart"> */}
                {
                cart ? 
                <h2 onClick={handleCartClick} id="cart_thumb">{`🛒 ${cart.total_items} items`}</h2> 
                : 
                <h2 id="cart_thumb">🛒 Sign up or log in to add items</h2>
                // <h2 id="cart_thumb">🛒 0 items </h2> 
                }
            {/* </Link> */}
        </div>
    )
}
export default Header