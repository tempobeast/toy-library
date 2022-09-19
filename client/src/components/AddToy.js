import React, { useState } from 'react';

function AddToy() {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [sku, setSku] = useState("")
    const [purchasePrice, setPurchasePrice] = useState("")
    const [inventory, setInventory] = useState("")
    const [ageRange, setAgeRange] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState([])


    function handleSubmit(e) {
        e.preventDefault()
        fetch('/toys', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name, 
                description: description,
                sku: sku,
                purchase_price: purchasePrice,
                inventory: inventory,
                age_range: ageRange,
                img_url: imageUrl
            })
        })
    }


    return (
        <div>
        <h1>Add a Toy</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input 
                    type="text"
                    id="name"
                    autoComplete="off"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />        
                <br />
                <label htmlFor="description">Description: </label>
                <input 
                    type="textarea"
                    id="description"
                    autoComplete="off"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="sku">SKU: </label>
                <input 
                    type="number"
                    id="sku"
                    autoComplete="off"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="purchase_price">Purchase Price: </label>
                <input 
                    type="number"
                    id="purchase_price"
                    autoComplete="off"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="inventory">Inventory: </label>
                <input
                    type="number"
                    id="inventory"
                    value={inventory}
                    onChange={(e) => setInventory(e.target.value)}
                /> 
                <br />
                <label htmlFor="age_range">Age Range: </label>
                <input
                    type="text"
                    id="age_range"
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                /> 
                <br />
                <label htmlFor="img_url">Image URL: </label>
                <input
                    type="text"
                    id="img_url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                /> 
                <br />
                <button type='submit'> {isLoading ? "Loading..." : "Add Toy"} </button>
                {errors ? errors.map((err) => <p key={err}>{err}</p>) : null}
            </form>
        </div>
    )
}

export default AddToy