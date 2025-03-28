import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cart";
import { ToysContext } from "../context/toys";
import { UserContext } from "../context/user";

function ToyCard({ toy }) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const navigate = useNavigate();

  const { toys, setToys } = useContext(ToysContext);
  const { setCart } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);
  const [errors, setErrors] = useState([]);
  const [toyAdded, setToyAdded] = useState(false)

  const nums = [];

  if (toy.inventory) {
    for (let i = 1; i <= toy.inventory; i++) {
      nums.push(i);
    }
  }

  const selectOptions = nums.map((num) => (
    <option value={num} key={num}>
      {num}
    </option>
  ));

  function handleAddToCartClick(e) {
    fetch("/cart_items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toy_id: toy.id,
        quantity: selectedQuantity,
        previous_order_id: null
      }),
    }).then((res) => {
      if (res.ok) {
        res
          .json()
          // [0] returns cart, [1] returns updated item
          .then((data) => {
            const updatedCart = data[0];
            const updatedToy = data[1];
            setCart(updatedCart);
            const newToyArray = toys.filter((toy) => toy.id !== updatedToy.id);
            setToys([...newToyArray, updatedToy]);
            setToyAdded(true)
            setTimeout(() => {
              
              setToyAdded(false)
            }, 1000);
          });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });
  }

  function handleWatchListClick(e) {
    fetch("/watch_lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ toy_id: toy.id }),
    })
      .then((res) => res.json())
      // returns user
      .then((user) => {
        setUser(user);
      });
  }

  function handleWatchListRemoveClick(e) {
    const watchToRemove = user.watch_lists.find(
      (watch) => watch.toy.id === toy.id
    );

    fetch(`/watch_lists/${watchToRemove.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((user) => setUser(user));
  }

  function handleQuantityChange(e) {
    setSelectedQuantity(e.target.value);
  }

  function handleCardClick(e) {
    navigate(`/view_toys/${toy.id}`);
  }

  if (user && user.is_admin) {
    return (
      <div className="toy-card">
        <div onClick={handleCardClick} id={toy.id}>
          <img className="toy-card-img" src={toy.img_url} alt={toy.name} />
          <h3>{toy.name}</h3>
          <h5>Inventory: {toy.inventory}</h5>
        </div>
      </div>
    );
  } else {
    return (
      <div className="toy-card">
        <div onClick={handleCardClick} id={toy.id}>
          <img className="toy-card-img" src={toy.img_url} alt={toy.name} />
          {toyAdded ? <div className="confirm-add-toy-container"> <div className="confirm-add-toy"><p>Toy added to cart!</p></div></div> : <div className="confirm-add-toy"><p>{errors[0]}</p></div>}
          <h3>{toy.name}</h3>
          {/* <h5>Inventory: {toy.inventory}</h5> */}
          <h5>Age Range: {toy.age_range}</h5>
        </div>
        {user && toy.inventory > 0 ? (
          <>
            <label className="toy-card__qty">Quantity: </label>
            <select className="toy-card__qty" onChange={handleQuantityChange}>{selectOptions}</select>
            <button onClick={handleAddToCartClick} id={toy.id}>
              add to cart
            </button>
            {errors ? errors.map((err) => <p key={err}>{err}</p>) : null}
          </>
        ) : user && toy.inventory === 0 ? (
          <>
            <label>Unavailble: </label>
            {user.watch_lists.some((watch) => watch.toy.id === toy.id) ? (
              <button onClick={handleWatchListRemoveClick}>
                Remove from Watch List
              </button>
            ) : (
              <button onClick={handleWatchListClick} id={toy.id}>
                Add to Watch List
              </button>
            )}
          </>
        ) : null}
      </div>
    );
  }
}
export default ToyCard;
