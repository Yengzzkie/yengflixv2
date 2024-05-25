import { Link } from "react-router-dom";
import Nav from "./Nav";
import LinkList from "./LinkList";

export default function Navigation() {


  return (
    <Nav>
      <h1 className="logo">YENGFLIX</h1>
      <LinkList>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
        <li>
          <Link to="/tvshows">TV Shows</Link>
        </li>
        <li>
          <Link to="/mylist">My List</Link>
        </li>
      </LinkList>
    </Nav>
  );
}
