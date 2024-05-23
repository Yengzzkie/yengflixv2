import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/Root";
import Error from "./routes/Error";
import Home from "./routes/Home";
import MovieDetails from "./routes/MovieDetails";
import Player from "./routes/Player";

const router = createBrowserRouter([
  { path: "/", element: <Root />, errorElement: <Error />, children: [
    {path: "/", element: <Home />},
    {path: "/details/:movieId", element: <MovieDetails />},
    {path: "/details/:id/player", element: <Player />},
  ] },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
