import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { TvDataContext, MovieDataContext, MyListContext, AddedToListContext, CurrentDateContext, RecentlyViewedContext, ContinueWatchContext } from "../utils/context";
import { MovieCarousel, CarouselContainer, MovieItem, ScrollButton, RoundButton } from "../components/CarouselComponents";
import styled from "styled-components";
import NewBadge from "../components/NewBadge";
import VideoType from "../components/VideoType";
import Title from "../components/Title";
import DescriptionPopup from "../components/DescriptionPopup";
import ImageCard from "../components/ImageCard";
import { notifyError, notifySuccess } from "../components/ToastNotification";
import Alerts from "../components/Alert";
// import Modal from "../components/Modal";

const ScrollLeftButton = styled(ScrollButton)`
    left: 10px;
`;

const ScrollRightButton = styled(ScrollButton)`
    right: 10px;
`;

export default function Home() {
  const { data } = useContext(MovieDataContext);
  const { topTV } = useContext(TvDataContext);
  const { setMyList } = useContext(MyListContext);
  const { added, setAdded } = useContext(AddedToListContext);
  const { currentDate } = useContext(CurrentDateContext);
  const { recentlyViewed } = useContext(RecentlyViewedContext);
  const { continueWatch } = useContext(ContinueWatchContext);
  const movieCarouselRef = useRef(null);
  const tvCarouselRef = useRef(null);
  const recentCarouselRef = useRef(null);
  const continueWatchCarouselRef = useRef(null);

  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  function handleAddToList(newMovie) {
    setMyList(prevList => {
      const updatedList = prevList || [];
      if (!updatedList.some(movie => movie.id === newMovie.id)) {
        notifySuccess();
        return [...updatedList, newMovie];
      }
      notifyError();
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

  const threeMonthsAgo = new Date(currentDate);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  return (
    <main>
      {/* <Modal /> */}
      <Alerts />
      {/* MOVIES SECTION */}
      <h2 className="carousel-header pl-3">Top 10 Movies</h2>
      <MovieCarousel>
        <ScrollLeftButton onClick={() => scrollLeft(movieCarouselRef)}>‹</ScrollLeftButton>
        <CarouselContainer ref={movieCarouselRef}>
          {data && data.slice(0, 10).map((movie, index) => {
            const releaseDate = new Date(movie.release_date);
            const isNew = releaseDate >= threeMonthsAgo && releaseDate <= currentDate;

            return (
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
                    <Title>{movie.title} {isNew && <NewBadge>NEW</NewBadge>}</Title>
                    <p className="release-date">{movie.release_date}</p>
                    <p>{movie.overview}</p>
                  </DescriptionPopup>
                )}
              </MovieItem>
            );
          })}
        </CarouselContainer>
        <ScrollRightButton onClick={() => scrollRight(movieCarouselRef)}>›</ScrollRightButton>
      </MovieCarousel>

      {/* TV SERIES SECTION */}
      <h2 className="carousel-header">Top 10 TV Series</h2>
      <MovieCarousel>
        <ScrollLeftButton onClick={() => scrollLeft(tvCarouselRef)}>‹</ScrollLeftButton>
        <CarouselContainer ref={tvCarouselRef}>
          {topTV && topTV.slice(0, 10).map((tv, index) => {
            const releaseDate = new Date(tv.first_air_date);
            const isNew = releaseDate >= threeMonthsAgo && releaseDate <= currentDate;

            return (
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
                    <Title>{tv.name} {isNew && <NewBadge>NEW</NewBadge>}</Title>
                    <p className="release-date">{tv.first_air_date}</p>
                    <p>{tv.overview}</p>
                  </DescriptionPopup>
                )}
              </MovieItem>
            );
          })}
        </CarouselContainer>
        <ScrollRightButton onClick={() => scrollRight(tvCarouselRef)}>›</ScrollRightButton>
      </MovieCarousel>

      {/* RECENTLY VIEWED SECTION */}
      <h2 className="carousel-header">Recently Viewed</h2>
      <MovieCarousel>
        <ScrollLeftButton onClick={() => scrollLeft(recentCarouselRef)}>‹</ScrollLeftButton>
        <CarouselContainer ref={recentCarouselRef}>
          {recentlyViewed.length === 0 ? <span className="text-center w-full">No movie recently viewed yet</span> : (
            recentlyViewed && recentlyViewed.slice(0, 10).map((movie) => {
            
              return (
                <Link key={movie.id} to={`/details/${movie.id}`}>
                <li className="recently-viewed-item">
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
                </li>
                </Link>
              );
            })
          )}
        </CarouselContainer>
        <ScrollRightButton onClick={() => scrollRight(recentCarouselRef)}>›</ScrollRightButton>
      </MovieCarousel>

      <h2 className="carousel-header">Continue Watching</h2>
      <MovieCarousel>
        <ScrollLeftButton onClick={() => scrollLeft(continueWatchCarouselRef)}>‹</ScrollLeftButton>
        <CarouselContainer ref={continueWatchCarouselRef}>
          {continueWatch.length === 0 ? (<span className="text-center w-full">No movies watched yet</span>) : (
            continueWatch && continueWatch.slice(0, 10).map((movie) => {
            
              return (
                <Link key={movie.id} to={`/details/${movie.id}`}>
                <li className="recently-viewed-item">
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
                </li>
                </Link>
              );
            })
          )}
        </CarouselContainer>
        <ScrollRightButton onClick={() => scrollRight(continueWatchCarouselRef)}>›</ScrollRightButton>
      </MovieCarousel>
    </main>
  );
}
