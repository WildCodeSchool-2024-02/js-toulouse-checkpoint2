import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import Cupcake from "../components/Cupcake";

/* ************************************************************************* */
const someCupcakes = [];
someCupcakes.push(
  {
    id: 10,
    accessory_id: "4",
    accessory: "wcs",
    color1: "blue",
    color2: "white",
    color3: "red",
    name: "France",
  },
  {
    id: 11,
    accessory_id: "4",
    accessory: "wcs",
    color1: "yellow",
    color2: "red",
    color3: "black",
    name: "Germany",
  },
  {
    id: 27,
    accessory_id: "5",
    accessory: "christmas-candy",
    color1: "yellow",
    color2: "blue",
    color3: "blue",
    name: "Sweden",
  },
);

/* you can use someCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

function CupcakeList() {
  const [accessories, setAccessories] = useState([]);
  const [selectedAccesories, setSelectedAccesories] = useState("");
  const fetchedCupCakes = useLoaderData();
  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((response) => response.json())
      .then((data) => setAccessories(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by
          <select id="cupcake-select" onChange={(e) => setSelectedAccesories(e.target.value)}>
            <option value="">---</option>
            {accessories?.map((el) => (
              <option key={el.id} value={el.slug}>
                {el.slug}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {fetchedCupCakes
          ?.filter((cake) =>
            selectedAccesories === "" ? cake : cake.accessory === selectedAccesories,
          )
          .map((el) => (
            <li key={el.id} className="cupcake-item">
              <Cupcake data={el} />
            </li>
          ))}
      </ul>
    </>
  );
}

export default CupcakeList;
