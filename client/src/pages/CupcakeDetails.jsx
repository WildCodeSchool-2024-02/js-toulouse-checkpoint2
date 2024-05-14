import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CupcakeDetails() {
  const { id } = useParams();
  const [cupcake, setCupcake] = useState(null);

  useEffect(() => {
    const fetchCupcake = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/cupcakes/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cupcake");
        }
        const data = await response.json();
        setCupcake(data);
      } catch (error) {
        console.error("Error fetching cupcake:", error);
      }
    };

    fetchCupcake();
  }, [id]);

  if (!cupcake) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{cupcake.name}</h1>
      <p>
        Colors: {cupcake.color1}, {cupcake.color2}, {cupcake.color3}
      </p>
      <p>Accessory: {cupcake.accessory}</p>
    </div>
  );
}

export default CupcakeDetails;
