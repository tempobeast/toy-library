import React, { useContext, useState } from 'react'
import { ToysContext } from '../context/toys'
import { useParams } from 'react-router-dom'
import { CartContext } from '../context/cart'
import { UserContext } from '../context/user'

function ToyPage() {

    const { toyId } = useParams()
    const { toys, setToys } = useContext(ToysContext)
    const { setCart } = useContext(CartContext)
    const { user } = useContext(UserContext)
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const toyToView = toys.find((toy) => toy.id === parseInt(toyId))
    console.log(toyId)
    console.log(toys)
    console.log(toyToView)
    console.log(user)

    const { name, description, purchase_price, inventory, img_url, sku } = toyToView

    const nums = []

    if (inventory) {
        for (let i = 1; i <= inventory; i++) {
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
                    toy_id: toyId,
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
        <div>
            <img src={img_url} alt={name}/>
            <h1>{name}</h1>
            <h3>Purchase Price: {purchase_price}</h3>
            <h3>Inventory: {inventory}</h3>
            <p>{description}</p>
            { user ?
            <>
            <label>Quantity:</label>
            <select onChange={(e) => setSelectedQuantity(e.target.value)}>
                {selectOptions}
            </select>
            <button onClick={handleAddToCartClick}>add to cart</button>
            </>
            : null
            }   
        </div>
    )
}
export default ToyPage