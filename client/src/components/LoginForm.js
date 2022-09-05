import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user';
import { CartContext } from '../context/cart';


function LoginForm() {

    const { setUser } = useContext(UserContext)
    const { setCart } = useContext(CartContext)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password})
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    console.log(data)
                    const user = data[0]
                    const cart = data[1]
                    setUser(user);
                    setCart(cart)
                    navigate(`/user_profiles/${user.id}`);
                });
                
            } else {
                res.json().then((data) => setErrors(data.errors));
            }
        })

    }


    function handleUsernameChange(e) {
        setUsername(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input 
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />        
                <br />
                <label htmlFor="password">Password: </label>
                <input 
                    type="password"
                    id="password"
                    autoComplete="off"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <br />
                <button type='submit'> {isLoading ? "Loading..." : "Login"} </button>
                {errors ? errors.map((err) => <p key={err}>{err}</p>) : null}
            </form>
        </div>
    )
}

export default LoginForm