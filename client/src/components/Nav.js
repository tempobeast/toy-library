import { Link, useNavigate } from 'react-router-dom'
import {useContext} from 'react'
import { UserContext } from '../context/user'
import { CartContext } from '../context/cart'
import '../App.css';


function Nav() {
    const { user, setUser } = useContext(UserContext)
    const {setCart} = useContext(CartContext)
    const navigate = useNavigate()

    function handleLogout() {
        fetch("/logout", 
        { method: "DELETE" }).then((res) => {
            if (res.ok) {
                setUser(null);
                setCart(null)
                navigate("/")
            }
        });
      }


    return (
        <div id="nav">
            <button>
                <Link to= "/view_all_toys">View Toys</Link>
            </button>
            {user ? 
                <button>
                    <Link to={`/user_profiles/${user.id}`}>{user.first_name}'s Account</Link>
                </button> 
                : 
                null
            }
            {
            user ? 
                <button onClick={handleLogout}>
                    Logout
                </button> 
                : 
                <button>
                    <Link to="user_login">Login</Link>
                </button>
                }
        </div>
    )
}

export default Nav