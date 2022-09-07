import { useContext, useState } from 'react'
import { UserContext } from '../context/user'
import { CartContext } from '../context/cart'


function AddressForm({editAddress, setEditAddress}) {

    const { user, setUser } = useContext(UserContext)
    const { setCart } = useContext(CartContext)

    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip, setZip] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState([])

    function handleAddSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch(`/user_addresses/${user.user_address.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                street: street, 
                city: city,
                state: state,
                zip: zip
            })
        }).then((res) => {
            if (res.ok) {
                res.json().then((user) => {
                    setUser(user);
                    setEditAddress(false)
                });
            } else {
                res.json().then((data) => setErrors(data.errors));
            }
        })
    }

    function handleUpdateSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch(`/user_addresses/${user.user_address.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                street: street, 
                city: city,
                state: state,
                zip: zip
            })
        }).then((res) => {
            if (res.ok) {
                res.json().then((user) => {
                    setUser(user);
                    setEditAddress(false)
                });
            } else {
                res.json().then((data) => setErrors(data.errors));
            }
        })
    }



    return (
        <div>
            <h1>{editAddress ? "Edit Address" : "Add Address"}</h1>
            <form onSubmit={user.user_address ? {handleUpdateSubmit} : {handleAddSubmit}}>
                <label htmlFor="street">Street: </label>
                <input 
                    type="text"
                    id="street"
                    autoComplete="off"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                />        
                <br />
                <label htmlFor="city">City: </label>
                <input 
                    type="city"
                    id="city"
                    autoComplete="off"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="state">State: </label>
                <input 
                    type="state"
                    id="state"
                    autoComplete="off"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="zip">Zip: </label>
                <input 
                    type="zip"
                    id="zip"
                    autoComplete="off"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    required
                />
                <br />
                <button type='submit'> {isLoading ? "Loading..." : isLoading && user.user_address ? "Submit Changes" : "Add Address"} </button>
                {errors ? errors.map((err) => <p key={err}>{err}</p>) : null}
            </form>
        </div>
    )
}

export default AddressForm