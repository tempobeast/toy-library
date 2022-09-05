import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cart";
import { ToysContext } from "../context/toys";
import { UserContext } from "../context/user";
// import { WatchListContext } from "../context/watchList"

function ToyCard({toy}) {

    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const navigate = useNavigate()
   
    const { toys, setToys } = useContext(ToysContext) 
    const { setCart } = useContext(CartContext) 
    const { user, setUser } = useContext(UserContext)
    // const { watchList, setWatchList } = useContext(WatchListContext)

    const nums = []

        if (toy.inventory) {
            for (let i = 1; i <= toy.inventory; i++) {
                nums.push(i)
            }      
        }
    
    const selectOptions = nums.map((num) => <option value={num} key={num}>{num}</option>)

    function handleAddToCartClick(e) {
            fetch("/cart_items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                        toy_id: toy.id,
                        quantity: selectedQuantity,
                    })
            })
            .then((res) => res.json())
            // [0] returns cart, [1] returns updated item
            .then((data) => {
                console.log(data)
                const updatedCart = data[0]
                const updatedToy = data[1]
                setCart(updatedCart)
                const newToyArray = toys.filter((toy) => toy.id !== updatedToy.id)
                setToys([...newToyArray, updatedToy])
            })
    }

    function handleWatchListClick(e) {
        fetch('/watch_lists', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({toy_id: toy.id})
        })
        .then((res) => res.json())
        // returns user
        .then((user) => {
            setUser(user)
        })
    }

    function handleWatchListRemoveClick(e) {
        const watchToRemove = user.watch_lists.find(watch => watch.toy.id === toy.id)
       
        fetch(`/watch_lists/${watchToRemove.id}`, {
            method: "DELETE",
        })
        .then((res) => res.json())
        .then((user) => setUser(user))
    }

    function handleQuantityChange(e) {
        setSelectedQuantity(e.target.value)
    }

    function handleCardClick(e) {
        navigate(`/toy_pages/${toy.id}`)
    }

    return (
        <div className="toy-card" >
            <div onClick={handleCardClick} id={toy.id}>
                <img className="toy-card-img" src={toy.img_url}/>
                <h3>{toy.name}</h3>
                <h5>Inventory: {toy.inventory}</h5>
                <h5>Age Range: {toy.age_range}</h5>
            </div>
            {user && toy.inventory > 0 ?
            <>
            <label>Quantity: </label>
            <select onChange={handleQuantityChange}>
                {selectOptions}
            </select>
            <button onClick={handleAddToCartClick} id={toy.id}>add to cart</button>
            </> : user && toy.inventory === 0 ?
            <>
            <label>Unavailble: </label>
            { user.watch_lists.some(watch => watch.toy.id === toy.id) ? <button onClick={handleWatchListRemoveClick}>Remove from Watch List</button>
            : 
            <button onClick={handleWatchListClick} id={toy.id}>Add to Watch List</button>
             } 
            </> : null
            }
        </div>
    )
}
export default ToyCard