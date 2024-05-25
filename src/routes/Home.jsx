import { useContext, useRef } from "react";
import { PageContext, TvDataContext, MovieDataContext, MyListContext, AddedToListContext } from "../routes/Root";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import styled from "styled-components";
import { MovieCarousel, CarouselContainer, MovieItem, ScrollButton, RoundButton } from "../components/CarouselComponents";
import DescriptionPopup from "../components/DescriptionPopup";

const ScrollLeftButton = styled(ScrollButton)`
    left: 10px;
`;

const ScrollRightButton = styled(ScrollButton)`
    right: 10px;
`;

export default function Home() {
  const { data } = useContext(MovieDataContext);
  const { tvData } = useContext(TvDataContext);
  const { setMyList } = useContext(MyListContext);
  const { setCurrentPage } = useContext(PageContext);
  const { added, setAdded } = useContext(AddedToListContext)
  const movieCarouselRef = useRef(null);
  const tvCarouselRef = useRef(null);

  function incrementPage() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  function handleAddToList(newMovie) {
    setMyList(prevList => {
      const updatedList = prevList || [];
      if (!updatedList.some(movie => movie.id === newMovie.id)) {
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

  function scrollLeft(ref) {
    ref.current.scrollBy({ left: -300, behavior: "smooth" });
  }

  function scrollRight(ref) {
    ref.current.scrollBy({ left: 300, behavior: "smooth" });
  }

  return (
    <main>
      {/* MOVIES SECTION */}
      <h2>Top 10 Movies</h2>
      <MovieCarousel>
        <ScrollLeftButton onClick={() => scrollLeft(movieCarouselRef)}>‹</ScrollLeftButton>
        <CarouselContainer ref={movieCarouselRef}>
          {data && data.slice(0, 10).map((movie, index) => (
            <MovieItem key={movie.id}>
              <span className="toplist-number">{index + 1}</span>
              <img
                className="movie-image"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
              />
              <DescriptionPopup className="description">
                <img className="backdrop-image" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="" />
                <Link to={`/details/${movie.id}`}>
                  <RoundButton><FontAwesomeIcon icon={faPlay} /></RoundButton>
                </Link>
                <RoundButton onClick={() => handleClick(movie)}>{added ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faPlus} />}</RoundButton>
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
              </DescriptionPopup>
            </MovieItem>
          ))}
        </CarouselContainer>
        <ScrollRightButton onClick={() => scrollRight(movieCarouselRef)}>›</ScrollRightButton>
      </MovieCarousel>

      {/* TV SERIES SECTION */}
      <h2>Top 10 TV Series</h2>
      <MovieCarousel>
        <ScrollLeftButton onClick={() => scrollLeft(tvCarouselRef)}>‹</ScrollLeftButton>
        <CarouselContainer ref={tvCarouselRef}>
          {tvData && tvData.slice(0, 10).map((tv, index) => (
            <MovieItem key={tv.id}>
              <span className="toplist-number">{index + 1}</span>
              <img
                className="movie-image"
                src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`}
                alt={tv.name}
              />
              <DescriptionPopup className="description">
                <img className="backdrop-image" src={`https://image.tmdb.org/t/p/original/${tv.backdrop_path}`} alt="" />
                <Link to={`/details/${tv.id}`}>
                  <RoundButton><FontAwesomeIcon icon={faPlay} /></RoundButton>
                </Link>
                <RoundButton onClick={() => handleClick(tv)}>{added ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faPlus} />}</RoundButton>
                <h3>{tv.name}</h3>
                <p>{tv.overview}</p>
              </DescriptionPopup>
            </MovieItem>
          ))}
        </CarouselContainer>
        <ScrollRightButton onClick={() => scrollRight(tvCarouselRef)}>›</ScrollRightButton>
      </MovieCarousel>

      <Button onClick={incrementPage}>Next</Button>
    </main>
  );
}
