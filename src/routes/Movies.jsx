import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { ErrorContext, LoadingContext, PageContext, MyListContext, AddedToListContext } from "./Root";
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
  const [movies, setMovies] = useState([]);
  const { setError } = useContext(ErrorContext);
  const { setLoading } = useContext(LoadingContext);
  const { setCurrentPage } = useContext(PageContext);
  const { setMyList } = useContext(MyListContext);
  const { added, setAdded } = useContext(AddedToListContext);

  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTkwMGIwZmVhZjZjZjVkMjk0MDc1YjAxNDRkMmZiYSIsInN1YiI6IjY2MTA4NDQ1NWIzNzBkMDE3MDYzMzFjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r2V8Oru9xaAu4JLQPZw_nqv_lVULwa-ZPfq8ruQHwvg",
    },
  };

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
          options
        );
        if (!response.ok) {
          throw new Error("HTTP request unsuccessful");
        }
        const result = await response.json();
        const modResult = await result.results;
        const newMovieArray = modResult.map((movies) => ({
          ...movies,
          type: "movie",
        }));
        console.log(newMovieArray);
        setMovies(newMovieArray);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  function incrementPage() {
    setCurrentPage((prevPage) => prevPage + 1);
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
