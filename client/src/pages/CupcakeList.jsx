import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import Cupcake from "../components/Cupcake";

function CupcakeList() {
  // Step 1: get all cupcakes
  const cupcakes = useLoaderData();
  console.info(cupcakes);
  const [accessories, setAccessories] = useState([]);
  const [selectedAccessory, setSelectedAccessory] = useState("");

  useEffect(() => {
    async function fetchAccessories() {
      try {
        const response = await fetch("http://localhost:3310/api/accessories");
        if (!response.ok) {
          throw new Error("ya pas d'accessoir frero");
        }
        const data = await response.json();
        setAccessories(data);
        console.info(data);
      } catch (error) {
        console.error("ya toujours pas d'accesoir mec", error);
      }
    }

    fetchAccessories();
  }, []);

  const filteredCupcakes = selectedAccessory
    ? cupcakes.filter((cupcake) => cupcake.accessory_id === selectedAccessory)
    : cupcakes;

  // Step 3: get all accessories

  // Step 5: create filter state

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select
            id="cupcake-select"
            value={selectedAccessory}
            onChange={(e) => setSelectedAccessory(e.target.value)}
          >
            <option value="">---</option>
            {accessories.map((accessory) => (
              <option key={accessory.id} value={accessory.id}>
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {filteredCupcakes.map((cupcake) => (
          <li key={cupcake.id} className="cupcake-item">
            <Cupcake data={cupcake} />
          </li>
        ))}
        {/* Step 2: repeat this block for each cupcake */}
        {/* Step 5: filter cupcakes before repeating */}
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;
