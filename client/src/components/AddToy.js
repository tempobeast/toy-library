import React, { useState, useContext } from "react";
import { ToysContext } from "../context/toys";
import { ToyToUpdateContext } from "../context/toyToUpdate";
import { useNavigate } from "react-router-dom";

function AddToy() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const { toyToUpdate, setToyToUpdate } = useContext(ToyToUpdateContext);
  const { toys, setToys } = useContext(ToysContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    toyToUpdate
      ? {
          name: toyToUpdate.name,
          description: toyToUpdate.description,
          sku: toyToUpdate.sku,
          purchase_price: toyToUpdate.purchase_price,
          inventory: toyToUpdate.inventory,
          age_range: toyToUpdate.age_range,
          img_url: toyToUpdate.img_url,
        }
      : {
          name: "",
          description: "",
          sku: "",
          purchase_price: "",
          inventory: "",
          age_range: "",
          img_url: "",
        }
  );

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    setIsLoading(true)
    e.preventDefault();
    fetch("/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((newToy) => {
          setToys([...toys, newToy]);
          navigate("/view_toys");
          setIsLoading(false)
        });
      } else {
        res.json().then((err) => {
            setErrors(err.errors)
            setIsLoading(false)
        });
      }
    });
  }

  function handleUpdate(e) {
    setIsLoading(true)
    e.preventDefault();
    fetch(`/toys/${toyToUpdate.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        const newToyArray = toys.filter((toy) => toy.id !== updatedToy.id);
        setToys([...newToyArray, updatedToy]);
        setToyToUpdate(null);
        setIsLoading(false)
        navigate(`/view_toys/${updatedToy.id}`);
      });
  }

  return (
    <div className="content">
      <h1>{toyToUpdate ? `Update ${toyToUpdate.name}` : "Add a Toy"}</h1>
      <form onSubmit={toyToUpdate ? handleUpdate : handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          autoComplete="off"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="description">Description: </label>
        <input
          type="textarea"
          name="description"
          autoComplete="off"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="sku">SKU: </label>
        <input
          type="number"
          name="sku"
          autoComplete="off"
          value={formData.sku}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="purchase_price">Purchase Price: </label>
        <input
          type="number"
          name="purchase_price"
          autoComplete="off"
          value={formData.purchase_price}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="inventory">Inventory: </label>
        <input
          type="number"
          name="inventory"
          value={formData.inventory}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="age_range">Age Range: </label>
        <input
          type="text"
          name="age_range"
          value={formData.age_range}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="img_url">Image URL: </label>
        <input
          type="text"
          name="img_url"
          value={formData.img_url}
          onChange={handleChange}
        />
        <br />
        <button type="submit">
          {" "}
          {isLoading
            ? "Loading..."
            : toyToUpdate
            ? "Update Toy"
            : "Add Toy"}{" "}
        </button>
        {errors ? errors.map((err) => <p key={err}>{err}</p>) : null}
      </form>
    </div>
  );
}

export default AddToy;
