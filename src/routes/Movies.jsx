import { useContext } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { MoviePageContext, MyListContext, AddedToListContext, AllMoviesContext, CurrentDateContext } from "../utils/context";
import { RoundButton } from "../components/CarouselComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCheck, faPlus, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Grid from "../components/Grid";
import ImageCard from "../components/ImageCard";
import VideoType from "../components/VideoType";
import Title from "../components/Title";
import DescriptionPopup from "../components/DescriptionPopup";
import NewBadge from "../components/NewBadge";
import styled from "styled-components";
import NextPrevButton from "../components/NextPrevButton";

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
        min-width: 300px;
        height: 50vh;
        z-index: 999;
        }
    }
`;

const NextButton = styled(NextPrevButton)`
    right: 12px;
`

const PrevButton = styled(NextPrevButton)`
    left: 12px;
`

export default function Movies() {
  const { movies } = useContext(AllMoviesContext);
  const { setMoviePage } = useContext(MoviePageContext);
  const { setMyList } = useContext(MyListContext);
  const { added, setAdded } = useContext(AddedToListContext);
  const { currentDate } = useContext(CurrentDateContext);

  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  function incrementPage() {
    setMoviePage((prevPage) => prevPage + 1);
  }

  function decrementPage() {
    setMoviePage((prevPage) => {
      if (prevPage > 1) {
        return prevPage - 1;
      }
      return prevPage;
    });
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

  const threeMonthsAgo = new Date(currentDate);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  return (
    <main>
      <Grid>
        {movies &&
          movies.map((movie) => {
            const releaseDate = new Date(movie.release_date);
            const isNew = releaseDate >= threeMonthsAgo && releaseDate <= currentDate;
            return (
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
                    <Title>{movie.title}{isNew && <NewBadge>NEW</NewBadge>}</Title>
                    <p className="release-date">{movie.release_date}</p>
                    <p>{movie.overview}</p>
                  </DescriptionPopup>
                )}
              </MovieList>
            );
          })}
        <PrevButton onClick={decrementPage}><FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon></PrevButton>
        <NextButton onClick={incrementPage}><FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon></NextButton>
      </Grid>
    </main>
  );
}
