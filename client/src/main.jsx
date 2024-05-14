import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

import Home from "./pages/Home";
import Instructions from "./pages/Instructions";
import CupcakeList from "./pages/CupcakeList";

// const getCupCake = () => {
//   let fetchedData = null;
//   fetch("http://localhost:3310/api/cupcakes")
//     .then((response) => response.json())
//     .then((data) => (fetchedData = data))
//     .catch((e) => console.error(e))
//     .finally(() => console.info("Requete terminée"));

//   return fetchedData;
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructions",
        element: <Instructions />,
      },
      {
        path: "/cupcakes",
        element: <CupcakeList />,
        loader: async () => fetch("http://localhost:3310/api/cupcakes"),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
