import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/user"
import { CartContext } from "../context/cart"

function UserProfile() {

    const {user, setUser} = useContext(UserContext)
    const {setCart} = useContext(CartContext)
    const navigate = useNavigate()

    function handleDeleteClick(e) {
        fetch(`/users/${user.id}`, {
            method: "DELETE",
        }).then((res) => {
            if (res.ok) {
                setUser(null)
                setCart(null)
                navigate('/')  
            }
        })
    }

    function handleUpdateClick(e) {
        navigate("/update_user")
    }

    return (
        <div>
            <h1>{`${user.first_name} ${user.last_name}'s Profile`}</h1>
            <h2>{`Hello, ${user.username}!`}</h2>
            <button onClick={handleDeleteClick}>Delete Account</button>
            <button onClick={handleUpdateClick}> Update Account </button>
        </div>
    )
}
export default UserProfile