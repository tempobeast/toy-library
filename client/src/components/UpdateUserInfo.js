import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";

function UpdateUserInfo() {
  const { user, setUser } = useContext(UserContext);

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [telephone, setTelephone] = useState(user.telephone);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  console.log(user.id);

  function handleUpdateSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        telephone: telephone,
      }),
    }).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        res.json().then((user) => {
          console.log(user);
          setUser(user);
          navigate(`/user_profiles/${user.id}`);
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div className="content update-user">
      <h1>Update Account Information</h1>
      <form onSubmit={handleUpdateSubmit}>
        <label htmlFor="username">{`Username: ${user.username}`}</label>
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
        <label htmlFor="last-name">Last Name: </label>
        <input
          type="last-name"
          id="last-name"
          autoComplete="off"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="telephone">Telephone: </label>
        <input
          type="text"
          id="telephone"
          autoComplete="off"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
        <button type="submit">
          {" "}
          {isLoading ? "Loading..." : "Update Info"}{" "}
        </button>
        {errors ? errors.map((err) => <p key={err}>{err}</p>) : null}
      </form>
    </div>
  );
}

export default UpdateUserInfo;
