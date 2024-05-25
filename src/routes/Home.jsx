import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { TvDataContext, MovieDataContext, MyListContext, AddedToListContext } from "../routes/Root";
import { MovieCarousel, CarouselContainer, MovieItem, ScrollButton, RoundButton } from "../components/CarouselComponents";
import styled from "styled-components";
import VideoType from "../components/VideoType";
import Title from "../components/Title";
import DescriptionPopup from "../components/DescriptionPopup";
import ImageCard from "../components/ImageCard";

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
  const { added, setAdded } = useContext(AddedToListContext);
  const movieCarouselRef = useRef(null);
  const tvCarouselRef = useRef(null);

  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

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
              {isMobile ? (
                <Link to={`/details/${movie.id}`}>
                  <ImageCard
                    className="movie-image"
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
              ) : (
                <ImageCard
                  className="movie-image"
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                />
              )}
              {!isMobile && (
                <DescriptionPopup className="description">
                  <img className="backdrop-image" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="" />
                  <Link to={`/details/${movie.id}`}>
                    <RoundButton><FontAwesomeIcon icon={faPlay} /></RoundButton>
                  </Link>
                  <RoundButton onClick={() => handleClick(movie)}>{added ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faPlus} />}</RoundButton>
                  <VideoType>{movie.type}</VideoType>
                  <Title>{movie.title}</Title>
                  <p className="release-date">{movie.release_date}</p>
                  <p>{movie.overview}</p>
                </DescriptionPopup>
              )}
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
              {isMobile ? (
                <Link to={`/details/${tv.id}`}>
                  <ImageCard
                    className="movie-image"
                    src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`}
                    alt={tv.name}
                  />
                </Link>
              ) : (
                <ImageCard
                  className="movie-image"
                  src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`}
                  alt={tv.name}
                />
              )}
              {!isMobile && (
                <DescriptionPopup className="description">
                  <img className="backdrop-image" src={`https://image.tmdb.org/t/p/original/${tv.backdrop_path}`} alt="" />
                  <Link to={`/details/${tv.id}`}>
                    <RoundButton><FontAwesomeIcon icon={faPlay} /></RoundButton>
                  </Link>
                  <RoundButton onClick={() => handleClick(tv)}>{added ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faPlus} />}</RoundButton>
                  <VideoType>{tv.type}</VideoType>
                  <h3>{tv.name}</h3>
                  <p className="release-date">{tv.first_air_date}</p>
                  <p>{tv.overview}</p>
                </DescriptionPopup>
              )}
            </MovieItem>
          ))}
        </CarouselContainer>
        <ScrollRightButton onClick={() => scrollRight(tvCarouselRef)}>›</ScrollRightButton>
      </MovieCarousel>

      
    </main>
  );
}
