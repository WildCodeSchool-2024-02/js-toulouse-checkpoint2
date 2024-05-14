import "./CupecakeDetails.css";
import { useParams, useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";

function CupCakeDetails() {
  const { id } = useParams();
  const fetchedCupCakes = useLoaderData();
  const cake = fetchedCupCakes.find((el) => el.id.toString() === id);

  return (
    <>
      <h1>Details</h1>
      <div className="card">
        <Cupcake data={cake} />
        <ul>
          <li>Accessory : {cake.accessory}</li>
          <li>Color 1 : {cake.color1}</li>
          <li>Color 2 : {cake.color2}</li>
          <li>Color 3 : {cake.color3}</li>
        </ul>
      </div>
    </>
  );
}

export default CupCakeDetails;
