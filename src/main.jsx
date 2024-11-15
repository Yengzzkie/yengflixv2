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
import Chat from "./routes/Chat";
import { SpeedInsights } from "@vercel/speed-insights/react"

const router = createBrowserRouter([
  { path: "/", element: <Root />, errorElement: <Error />, children: [
    {path: "/", element: <Home />},
    {path: "/movies", element: <Movies />},
    {path: "/tvshows", element: <TVshows />},
    {path: "/details/:movieId", element: <MoviePlayer />},
    {path: "/mylist", element: <MyList />},
    {path: "/chat", element: <Chat />},
  ] },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <SpeedInsights />
  </React.StrictMode>
);
