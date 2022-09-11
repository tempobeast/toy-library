import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/user"
import { CartContext } from "../context/cart"
import { PreviousOrdersContext } from "../context/previousOrders"
import PreviousOrdersCard from "./PreviousOrderCard"

function UserProfile() {

    const {user, setUser} = useContext(UserContext)
    const {setCart} = useContext(CartContext)
    const { previousOrders } = useContext(PreviousOrdersContext)
    const [ previousOrdersClick, setPreviousOrdersClick ] = useState(false)
    const navigate = useNavigate()
    

    const {first_name, last_name, watch_lists, username, id} = user

    console.log(previousOrders)

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
            {previousOrders.length > 0 ? <button className="user-profile-button" onClick={() => setPreviousOrdersClick(!previousOrdersClick)}>{!previousOrdersClick ? "View Previous Orders" : "Close Previous Orders"}</button> : null}
            {previousOrdersClick ? <PreviousOrdersCard /> : null}
            {watch_lists.length > 0 ? 
            <>
                <h3>Watch List: </h3>
                {watch_lists.map((watch) => 
                    <div key={watch.toy.id}>
                        <p>{watch.queue === 1 ? `You're next in line for:` : watch.queue === 2 ? "There is 1 customer ahead of you for:" :`There are ${watch.queue - 1} customers in line ahead of you for:`}</p>
                        <h4 >{watch.toy.name}</h4>
                    </div>
                
                )}
            </>
            : null
            }
            <br/>
            <button className="user-profile-button" onClick={handleDeleteClick}>Delete Account</button>
            <button className="user-profile-button" onClick={handleUpdateClick}> Update Account </button>
        </div>
    )
}
export default UserProfile