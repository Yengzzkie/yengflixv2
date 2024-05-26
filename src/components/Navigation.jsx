import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Nav from "./Nav";
import LinkList from "./LinkList";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {isMobile ? (
        <div className="mobile-header">
          <FontAwesomeIcon icon={faBars} onClick={handleMenuToggle} className="hamburger-icon" />
          <Link to="/" onClick={handleLinkClick}>
            <h1 className="mobile-logo">YENGFLIX</h1>
          </Link>
          <input type="text" placeholder="Search Movies or TV" className="visible" />
        </div>
      ) : null}
      <div className={`overlay ${menuOpen ? 'visible' : ''}`}>
        <Nav>
          {!isMobile && (
            <Link to="/" onClick={handleLinkClick}>
              <h1 className="logo">YENGFLIX</h1>
            </Link>
          )}
          <LinkList>
            <li>
              <Link to="/" onClick={handleLinkClick}>Home</Link>
            </li>
            <li>
              <Link to="/movies" onClick={handleLinkClick}>Movies</Link>
            </li>
            <li>
              <Link to="/tvshows" onClick={handleLinkClick}>TV Shows</Link>
            </li>
            <li>
              <Link to="/mylist" onClick={handleLinkClick}>My List</Link>
            </li>
          </LinkList>
        </Nav>
      </div>
    </>
  );
}
