import React, { useState, useContext } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { UserContext } from "../context/user";
import { CartContext } from "../context/cart";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const { setUser } = useContext(UserContext);
  const { setCart } = useContext(CartContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      alert("Passwords do not match");
    } else {
      setErrors([]);
      setIsLoading(true);
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          password_confirmation: passwordConfirmation,
          first_name: firstName,
          last_name: lastName,
          email: email,
          telephone: telephone,
          isAdmin: false,
        }),
      }).then((res) => {
        setIsLoading(false);
        if (res.ok) {
          res.json().then((data) => {
            const user = data[0];
            setUser(user);
            const cart = data[1];
            setCart(cart);
            navigate(`/user_profiles/${user.id}`);
          });
        } else {
          res.json().then((err) => setErrors(err.errors));
        }
      });
    }
  }

  return (
    <div>
      <h1>Signup: </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password Confirmation: </label>
        <input
          type="password"
          id="password-confirmation"
          autoComplete="current-password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
        <br />
        <label htmlFor="first-name">First Name: </label>
        <input
          type="first-name"
          id="first-name"
          autoComplete="off"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="last-name">Last Name: </label>
        <input
          type="last-name"
          id="last-name"
          autoComplete="off"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="telephone">Telephone: </label>
        <PhoneInput
          id="telephone"
          defaultCountry="US"
          value={telephone}
          onChange={setTelephone}
        />
        <br />
        <button type="submit"> {isLoading ? "Loading..." : "Sign Up"} </button>
        {errors ? errors.map((err) => <p key={err}>{err}</p>) : null}
      </form>
    </div>
  );
}

export default SignUpForm;
