import { Link } from "react-router-dom";
import Nav from "../styles/Nav";
import LinkList from "../styles/LinkList";

export default function Navigation() {


  return (
    <Nav>
      <LinkList>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/details">Movie Details Page</Link>
        </li>
      </LinkList>
    </Nav>
  );
}
