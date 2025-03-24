import React, { useContext, useEffect, useState } from "react";
import { ToysContext } from "../context/toys";
import { ToyToUpdateContext } from "../context/toyToUpdate";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/user";


function ToyPage() {
  let params = useParams();
  const { toys, setToys } = useContext(ToysContext);
  const { setCart } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);
  const { setToyToUpdate } = useContext(ToyToUpdateContext);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [toyToView, setToyToView] = useState({});
  const [errors, setErrors] = useState([]);
  const [stars, setStars] = useState([["☆","☆","☆","☆","☆"], "rating"])
  const [userReviewed, setUserReviewed] = useState(false)
  const navigate = useNavigate();

  function formatStars(num, type) {
    if(num === 0) {
      setStars([stars[0], "unrated"])
    };
    const updatedStars = num
    const newStars = []
    for(let i = 1; i <= 5; i++) {
      if(i <= updatedStars) {
        newStars.push("★")
      } else {
        newStars.push("☆")
      }
    }
    setStars([newStars, type])
  }

  useEffect(() => {
      fetch(`/toys/${params.toyId}`)
        .then((res) => res.json())
        .then((toy) => {
          setToyToView(toy)
          if(toy.poly_reviews.find((review) => review.user_id === user.id)) {
            formatStars(toy.poly_reviews.find((review) => review.user_id === user.id).stars, "user")
            setUserReviewed(true)
          } else {
            formatStars(toy.review_average, "rating")
            setUserReviewed(false)
          }
        });
  }, [params.toyId]);

  const nums = [];

  if (toyToView.inventory) {
    for (let i = 1; i <= toyToView.inventory; i++) {
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
        toy_id: toyToView.id,
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
      body: JSON.stringify({ toy_id: toyToView.id }),
    })
      .then((res) => res.json())
      // returns user
      .then((user) => {
        setUser(user);
      });
  }

  function handleWatchListRemoveClick(e) {
    const watchToRemove = user.watch_lists.find(
      (watch) => watch.toy.id === toyToView.id
    );

    fetch(`/watch_lists/${watchToRemove.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((user) => setUser(user));
  }

  function handleUpdateToyClick(e) {
    setToyToUpdate(toyToView);
    navigate(`/update_toy/${toyToView.id}`);
  }

  function handleDeleteToyClick(e) {
    fetch(`/toys/${toyToView.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
          const newToyArray = toys.filter((toy) => toy.id !== toyToView.id);
          setToys(newToyArray);
          navigate("/view_toys");
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });
  }
 
  function handleReviewClick(e) {
    fetch('/poly_reviews/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({stars: e.target.id, reviewable_id: toyToView.id, reviewable_type: "Toy"}),
    })
    .then((res) => res.json())
    .then((rating) => {
      formatStars(rating, "user")
      setUserReviewed(true)

    })
  }

  const renderStars = stars[0].map((star, index) => (
    <span onClick={handleReviewClick} key={index} className={userReviewed ? "review user-reviewed" : "review"} id={index + 1}>{star}</span>
  ))

  const renderStarsAdmin = stars[0].map((star, index) => (
    <span key={index} className="review stars-admin" id={index + 1}>{star}</span>
  ))

  if (user && user.is_admin) {
    return (
      <div className="toy-page">
        <img
          className="toy-page-img"
          src={toyToView.img_url}
          alt={toyToView.name}
        />
        <div className="toy-page-details" id={toyToView.id}>
          <h3>{toyToView.name}</h3>
          <small>SKU: {toyToView.sku}</small>
          <p>{toyToView.description}</p>
          {/* <h5>Age Range: {toyToView.age_range}</h5> */}
          <h4>Inventory: {toyToView.inventory}</h4>
          <h5>Purchase Price: {toyToView.purchase_price}</h5>
          <div className="toy-page-admin-buttons">
            <button onClick={handleUpdateToyClick}>Update Toy</button>
            <button onClick={handleDeleteToyClick}>Delete Toy</button>
          </div>
          <div className="review-container">
            {renderStarsAdmin}
            {userReviewed ? <p className="user-rating-text">(Your rating)</p> : toyToView.review_average === 0 ? <p className="average-rating">No reviews</p> : <p className="average-rating">({toyToView.review_average} / 5 ★)</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="toy-page ">
        <img
          className="toy-page-img"
          src={toyToView.img_url}
          alt={toyToView.name}
        />
        <div className="toy-page-details" id={toyToView.id}>
          <h3>{toyToView.name}</h3>
          <p>{toyToView.description}</p>
          <h5>Age Range: {toyToView.age_range}</h5>
          
          {user && toyToView.inventory > 0 ? (
            <div>
              <div className="toy-page__quantity"> 
                <label>Quantity: </label>
                <select onChange={(e) => setSelectedQuantity}>
                  {selectOptions}
                </select>
              </div>
              <button onClick={handleAddToCartClick} id={toyToView.id}>
                add to cart
              </button>
              {errors ? errors.map((err) => <p key={err}>{err}</p>) : null}
            </div>
          ) : user && toyToView.inventory === 0 ? (
            <div>
              <label>Unavailble: </label>
              {user.watch_lists.some((watch) => watch.toy.id === toyToView.id) ? (
                <button onClick={handleWatchListRemoveClick}>
                  Remove from Watch List
                </button>
              ) : (
                <button onClick={handleWatchListClick} id={toyToView.id}>
                  Add to Watch List
                </button>
              )}
            </div>
          ) : null}
          <div className="review-container">
            {renderStars}
            {userReviewed ? <p className="user-rating-text">(Your rating)</p> : toyToView.review_average === 0 ? <p className="average-rating">No reviews</p> : <p className="average-rating">({toyToView.review_average} / 5 ★)</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ToyPage;
