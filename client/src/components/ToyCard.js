import React, { useContext, useState } from "react";
import { CartContext } from "../context/cart";
import { ToysContext } from "../context/toys"

function ToyCard({toy}) {

    const [selectedQuantity, setSelectedQuantity] = useState(1);
   
    const { toys, setToys } = useContext(ToysContext) 
    const { setCart } = useContext(CartContext) 
    
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
                const updatedCart = data[0]
                const updatedToy = data[1]
                setCart(updatedCart)
                const newToyArray = toys.filter((toy) => toy.id !== updatedToy.id)
                setToys([...newToyArray, updatedToy])
            })
    }


    return (
        <div className="toy-card">
            <img className="toy-card-img" src={toy.img_url}/>
            <h3>{toy.name}</h3>
            <h5>Inventory: {toy.inventory}</h5>
            <h5>Age Range: {toy.age_range}</h5>
            <label>Quantity:</label>
            <select onChange={(e) => setSelectedQuantity(e.target.value)}>
                {selectOptions}
            </select>
            <button onClick={handleAddToCartClick}>add to cart</button>
        </div>
    )
}
export default ToyCard