import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/user"
import { CartContext } from "../context/cart"
import { WatchListContext } from "../context/watchList"

function UserProfile() {

    const {user, setUser} = useContext(UserContext)
    const {setCart} = useContext(CartContext)
    const { watchList } = useContext(WatchListContext)
    const navigate = useNavigate()

    const {first_name, last_name, watch_list_toys, username, id} = user

    console.log(watchList)

    function handleDeleteClick(e) {
        fetch(`/users/${id}`, {
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
            <h1>{`${first_name} ${last_name}'s Profile`}</h1>
            <h2>{`Hello, ${username}!`}</h2>
            {watch_list_toys ? 
            <>
                <h3>Watch List: </h3>
                {watch_list_toys.map((toy) => <h4>{toy.name}</h4>)}
            </>
            : null
            }
            <button onClick={handleDeleteClick}>Delete Account</button>
            <button onClick={handleUpdateClick}> Update Account </button>
        </div>
    )
}
export default UserProfile