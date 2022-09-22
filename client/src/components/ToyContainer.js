import React, { useContext, useState } from "react";
import { ToysContext } from "../context/toys";
import ToyCard from "./ToyCard";

function ToyContainer() {
  const { toys } = useContext(ToysContext);
  const [age, setAge] = useState("");

  const toysToDisplay = toys.sort((a, b) =>
    a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  );
  const filterByAge = toysToDisplay.filter((toy) => {
    if (age && toy.age_range.includes("+")) {
      const ageRange = toy.age_range.slice(0, -1);
      return age >= parseInt(ageRange);
    } else if (age && toy.age_range.includes("-")) {
      const ageRange = toy.age_range.split("-");
      return age >= parseInt(ageRange[0]) && age <= parseInt(ageRange[1]);
    } else {
      return true;
    }
  });

  return (
    <div>
      <h2>Toys!!!</h2>
      <input
        type="text"
        placeholder="filter by age"
        onChange={(e) => setAge(e.target.value)}
      />
      <div className="toy-container">
        {filterByAge.map((toy) => (
          <ToyCard key={toy.id} toy={toy} />
        ))}
      </div>
    </div>
  );
}

export default ToyContainer;
