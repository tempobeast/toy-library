import React, { useContext, useEffect, useState } from 'react'
import { ToysContext } from '../context/toys'
import { ToyToUpdateContext } from '../context/toyToUpdate'
import { useParams, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/cart'
import { UserContext } from '../context/user'

function ToyPage() {

    let params = useParams()
    const { toys, setToys } = useContext(ToysContext)
    const { setCart } = useContext(CartContext)
    const { user, setUser } = useContext(UserContext)
    const { setToyToUpdate } = useContext(ToyToUpdateContext)
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [toyToView, setToyToView] = useState({})
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

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
        .then((res) => { 
            if (res.ok) {
                res.json()
        // [0] returns cart, [1] returns updated item
                .then((data) => {
                    const updatedCart = data[0]
                    const updatedToy = data[1]
                    setCart(updatedCart)
                    const newToyArray = toys.filter((toy) => toy.id !== updatedToy.id)
                    setToys([...newToyArray, updatedToy])
                })
            } else {
                res.json().then((err) => setErrors(err.errors))
            }
        })
}

function handleWatchListClick(e) {
    fetch('/watch_lists', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({toy_id: toyToView.id})
    })
    .then((res) => res.json())
    // returns user
    .then((user) => {
        setUser(user)
    })
}

function handleWatchListRemoveClick(e) {
    const watchToRemove = user.watch_lists.find(watch => watch.toy.id === toyToView.id)
   
    fetch(`/watch_lists/${watchToRemove.id}`, {
        method: "DELETE",
    })
    .then((res) => res.json())
    .then((user) => setUser(user))
}

    function handleUpdateToyClick(e) {
        setToyToUpdate(toyToView);
        navigate(`/update_toy/${toyToView.id}`)
    }

    function handleDeleteToyClick(e) {
        fetch(`/toys/${toyToView.id}`, {
            method: 'DELETE',
        }) 
        .then((res) => {
            if (res.ok) {
                const newToyArray = toys.filter((toy) => toy.id !== toyToView.id)
                setToys(newToyArray)
                navigate('/view_toys')
            } else {
                res.json().then((err) => setErrors(err.errors))
            }
        })
    }


    if (user && user.is_admin) {
        return (
            <div className="toy-page" >
            <img className="toy-page-img" src={toyToView.img_url} alt={toyToView.name}/>
            <div className='toy-page-details' id={toyToView.id}>
                    <h3>{toyToView.name}</h3>
                    <small>SKU: {toyToView.sku}</small>
                    <p>{toyToView.description}</p>
                    {/* <h5>Age Range: {toyToView.age_range}</h5> */}
                    <h4>Inventory: {toyToView.inventory}</h4>
                    <h5>Purchase Price: {toyToView.purchase_price}</h5>

                    <button onClick={handleUpdateToyClick}>Update Toy</button>
                    <button onClick={handleDeleteToyClick}>Delete Toy</button>
            </div>
        </div>
        )
    }


    return (
        <div className="toy-page" >
            <img className="toy-page-img" src={toyToView.img_url} alt={toyToView.name}/>
            <div className='toy-page-details' id={toyToView.id}>
                    <h3>{toyToView.name}</h3>
                    <p>{toyToView.description}</p>
                    <h5>Age Range: {toyToView.age_range}</h5>
                {user && toyToView.inventory > 0 ?
                <div>
                    <label>Quantity: </label>
                    <select onChange={(e) => setSelectedQuantity}>
                        {selectOptions}
                    </select>
                    <button onClick={handleAddToCartClick} id={toyToView.id}>add to cart</button>
                    {errors ? errors.map((err) => <p key={err}>{err}</p>) : null}
                </div> : user && toyToView.inventory === 0 ?
                <div>
                    <label>Unavailble: </label>
                    { user.watch_lists.some(watch => watch.toy.id === toyToView.id) ? <button onClick={handleWatchListRemoveClick}>Remove from Watch List</button>
                    : 
                    <button onClick={handleWatchListClick} id={toyToView.id}>Add to Watch List</button>
                    } 
                </div> : null
                }
            </div>
        </div>
    )
}
export default ToyPage