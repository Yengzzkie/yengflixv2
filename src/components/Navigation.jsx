import { Link } from "react-router-dom";
import Nav from "../styles/Nav";
import LinkList from "../styles/LinkList";

export default function Navigation() {


  return (
    <Nav>
      <h1 className="logo">YENGFLIX</h1>
      <LinkList>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/details/movies">Movies</Link>
        </li>
        <li>
          <Link to="/details/tv">TV Shows</Link>
        </li>
      </LinkList>
    </Nav>
  );
}
