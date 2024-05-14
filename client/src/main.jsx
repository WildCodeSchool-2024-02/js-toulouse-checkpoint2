import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

import Home from "./pages/Home";
import Instructions from "./pages/Instructions";
import CupcakeList from "./pages/CupcakeList";
import CupCakeDetails from "./pages/CupcakeDetails";

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
      {
        path: "/cupcakes/:id",
        element: <CupCakeDetails />,
        loader: async ({ params }) => {
          const reponse = await fetch("http://localhost:3310/api/cupcakes");
          const data = await reponse.json();
          const obj = data.find((el) => el.id.toString() === params.id);
          return obj;
        },
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
