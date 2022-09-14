import React, { useContext, useEffect, useState } from 'react'
import { ToysContext } from '../context/toys'
import { useParams } from 'react-router-dom'
import { CartContext } from '../context/cart'
import { UserContext } from '../context/user'

function ToyPage() {

    let params = useParams()
    const { toys, setToys } = useContext(ToysContext)
    const { setCart } = useContext(CartContext)
    const { user } = useContext(UserContext)
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [toyToView, setToyToView] = useState({})

    useEffect(() => {
        fetch(`/toys/${params.toyId}`)
        .then((res) => res.json())
        .then((toy) => setToyToView(toy))
    }, [])

    const nums = []

    if (toyToView.inventory) {
        for (let i = 1; i <= toyToView.inventory; i++) {
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
                    toy_id: toyToView.id,
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
            <img src={toyToView.img_url} alt={toyToView.name}/>
            <h1>{toyToView.name}</h1>
            <h3>Purchase Price: {toyToView.purchase_price}</h3>
            <h3>Inventory: {toyToView.inventory}</h3>
            <p>{toyToView.description}</p>
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