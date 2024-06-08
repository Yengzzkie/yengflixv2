import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { SearchInputContext, SearchResultContext } from "../utils/context";
import Grid from "../components/Grid";
import Nav from "./Nav";
import LinkList from "./LinkList";
import styled from "styled-components";
import ImageCard from "./ImageCard";
import Button from "./Button";
import Swal from "sweetalert2";

const InputBar = styled.input`
  background: gray;
  color: #fff;
  width: 50vw;
  border: none;
  padding: 0.5rem 1rem;
  margin: 2rem;
`;

const ResultImage = styled(ImageCard)`
  width: 150px;
  margin-right: 0.5rem;

  @media screen and (max-width: 1024px) {
    width: 50px;
  }
`;

const List = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
    margin: 1rem;
  }
`;

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { searchInput, setSearchInput } = useContext(SearchInputContext);
  const { searchResults } = useContext(SearchResultContext);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const handleLinkClick = () => {
    setMenuOpen(false);
    setSearchInput("");
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleClearData = () => {
    handleMenuToggle();
    Swal.fire({
      title: "Delete all data from local storage?",
      text: 'This will clear your "List", "Recently Viewed" and "Continue Watching"',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Data has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.removeItem("myList");
        localStorage.removeItem("recentlyViewed");
        localStorage.removeItem("continueWatch");
      } else {
        setMenuOpen(true);
      }
    });
  };

  return (
    <>
      {isMobile ? (
        <div className="mobile-header">
          <div className="mobile-header__inner">
            <FontAwesomeIcon
              icon={faBars}
              onClick={handleMenuToggle}
              className="hamburger-icon"
            />
            <Link to="/" onClick={handleLinkClick}>
              <h1 className="mobile-logo">YENGFLIX</h1>
            </Link>
            <input
              type="text"
              placeholder="Search Movies or TV"
              className="visible"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className="search-results">
            {searchInput && (
              <ul>
                {searchResults.map((result) => (
                  <Link
                    key={result.id}
                    to={`/details/${result.id}`}
                    onClick={handleLinkClick}
                  >
                    <List>
                      <ResultImage
                        src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                        alt={result.title || result.name}
                      />
                      {result.title || result.name}
                    </List>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : null}

      <div className={`overlay ${menuOpen ? "visible" : ""}`}>
        <Nav>
          {!isMobile && (
            <Link to="/" onClick={handleLinkClick}>
              <h1 className="logo">YENGFLIX</h1>
            </Link>
          )}
          <LinkList>
            <li>
              <Link to="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/movies" onClick={handleLinkClick}>
                Movies
              </Link>
            </li>
            <li>
              <Link to="/tvshows" onClick={handleLinkClick}>
                TV Shows
              </Link>
            </li>
            <li>
              <Link to="/mylist" onClick={handleLinkClick}>
                My List
              </Link>
            </li>
            <li>
              <Button onClick={handleClearData}>Clear Data</Button>
            </li>
          </LinkList>
          {!isMobile ? (
            <InputBar
              type="text"
              placeholder="Search Movies or TV"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          ) : null}
        </Nav>

        {!isMobile
          ? searchInput && (
              <Grid>
                {searchResults.map((result) => (
                  <List key={result.id}>
                    <Link
                      to={`/details/${result.id}`}
                      onClick={handleLinkClick}
                    >
                      <ResultImage
                        src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                        alt={result.title || result.name}
                      />
                    </Link>
                  </List>
                ))}
                <hr />
              </Grid>
            )
          : null}
      </div>
    </>
  );
}
