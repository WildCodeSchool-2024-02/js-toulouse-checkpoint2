import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import Cupcake from "../components/Cupcake";

function CupcakeList() {
  const cupcakes = useLoaderData();
  console.info(cupcakes);

  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const reponse = await fetch("http://localhost:3310/api/accessories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await reponse.json();
      setData(res);
      console.info(res);
    } catch (erreur) {
      console.error("Erreur :", erreur);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [taste, setTaste] = useState("---");
  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by
          <select
            id="cupcake-select"
            value={taste}
            onChange={(e) => setTaste(e.target.value)}
          >
            <option value="">---</option>
            {data &&
              data.map((item) => (
                <option key={item.id} value={item.slug}>
                  {item.name}
                </option>
              ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {cupcakes &&
          cupcakes
            .filter((obj) => (taste === "" ? obj : obj.accessory === taste))
            .map((cupcake) => (
              <li className="cupcake-item" key={cupcake.id}>
                <Cupcake data={cupcake} />
              </li>
            ))}
      </ul>
    </>
  );
}

export default CupcakeList;
