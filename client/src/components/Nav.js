import { NavLink, useNavigate } from 'react-router-dom'
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
                navigate("/home")
            }
        });
      }

    if (user) {
        return (
            <div id="nav">
                <NavLink to="view_toys" className="nav-link">
                    View Toys
                </NavLink>
                {user.is_admin ?
                <NavLink to="add_toy" className="nav-link">
                    Add Toy
                </NavLink>
                : null
                }
                <NavLink to={`user_profiles/${user.id}`} className="nav-link">
                    My Account
                </NavLink>
                <button onClick={handleLogout} className="nav-link">
                    Logout
                </button>
            </div>
        )
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
        )
    }
}

export default Nav

    //     <button className='nav-button'>
        //         <Link to= "/view_all_toys">View Toys</Link>
        //     </button>
        //     {user ? 
        //         <button className='nav-button'>
        //             <Link to={`/user_profiles/${user.id}`}>{user.first_name}'s Account</Link>
        //         </button> 
        //         : 
        //         null
        //     }
        //     {
        //     user ? 
        //         <button className='nav-button' onClick={handleLogout}>
        //             Logout
        //         </button> 
        //         : 
        //         <button className='nav-button'>
        //             <Link to="user_login">Login</Link>
        //         </button>
        //         } 
        // </div>
        