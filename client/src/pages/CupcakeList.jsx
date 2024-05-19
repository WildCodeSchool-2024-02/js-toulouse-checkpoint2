
// import Cupcake from "../components/Cupcake";

/* ************************************************************************* */

/* you can use someCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";

function CupcakeList() {
  // Step 1: get all cupcakes

  const cupcakes = useLoaderData();

  // Step 3: get all accessories
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    const fetchAccessories = async () => {
      const response = await fetch("http://localhost:3310/api/accessories");
      const data = await response.json();
      setAccessories(data);
    };

    fetchAccessories();
  }, []);
  // Step 5: create filter state

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select id="cupcake-select">
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
        {cupcakes.map((cupcake) => (
          <li key={cupcake.id} className="cupcake-item">
            <Cupcake data={cupcake} />
          </li>
        ))}
      </ul>
    </>
  );
}
export default CupcakeList;
