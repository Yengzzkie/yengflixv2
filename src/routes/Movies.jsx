import { useContext } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { PageContext, MyListContext, AddedToListContext, AllMoviesContext } from "./Root";
import { RoundButton } from "../components/CarouselComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import Grid from "../components/Grid";
import ImageCard from "../components/ImageCard";
import VideoType from "../components/VideoType";
import Title from "../components/Title";
import Button from "../components/Button";
import DescriptionPopup from "../components/DescriptionPopup";
import styled from "styled-components";

const MovieList = styled.li`
    position: relative;
    margin: 0;

    &:hover {
        .description {
        display: block;
        top: -15%;
        left: -30%;
        transform: translate(-50%, -50%);
        width: 20vw;
        height: 50vh;
        z-index: 999;
        }
    }
`

export default function Movies() {
  
  const { movies } = useContext(AllMoviesContext);
  const { setMoviePage } = useContext(PageContext);
  const { setMyList } = useContext(MyListContext);
  const { added, setAdded } = useContext(AddedToListContext);

  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  function incrementPage() {
    setMoviePage((prevPage) => prevPage + 1);
  }

  function handleAddToList(newMovie) {
    setMyList((prevList) => {
      const updatedList = prevList || [];
      if (!updatedList.some((movie) => movie.id === newMovie.id)) {
        return [...updatedList, newMovie];
      }
      return updatedList;
    });
  }

  const handleClick = (movie) => {
    handleAddToList(movie);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <Grid>
      {movies &&
        movies.map((movie) => (
          <MovieList key={movie.id}>
            {isMobile ? (
              <Link to={`/details/${movie.id}`}>
                <ImageCard
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
            ) : (
              <ImageCard
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
              />
            )}
            {!isMobile && (
              <DescriptionPopup className="description">
                <img
                  className="backdrop-image"
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt=""
                />
                <Link to={`/details/${movie.id}`}>
                  <RoundButton>
                    <FontAwesomeIcon icon={faPlay} />
                  </RoundButton>
                </Link>
                <RoundButton onClick={() => handleClick(movie)}>
                  {added ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} />
                  )}
                </RoundButton>
                <VideoType>{movie.type}</VideoType>
                <Title>{movie.title}</Title>
                <p className="release-date">{movie.release_date}</p>
                <p>{movie.overview}</p>
              </DescriptionPopup>
            )}
          </MovieList>
        ))}
      <Button onClick={incrementPage}>Next</Button>
    </Grid>
  );
}
