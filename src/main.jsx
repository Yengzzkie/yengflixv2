import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/Root";
import Error from "./routes/Error";
import Home from "./routes/Home";
import MoviePlayer from "./routes/MoviePlayer";
import MyList from "./routes/MyList";
import Movies from "./routes/Movies"
import TVshows from "./routes/TVshows";

const router = createBrowserRouter([
  { path: "/", element: <Root />, errorElement: <Error />, children: [
    {path: "/", element: <Home />},
    {path: "/movies", element: <Movies />},
    {path: "/tvshows", element: <TVshows />},
    {path: "/details/:movieId", element: <MoviePlayer />},
    {path: "/mylist", element: <MyList />},
  ] },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
