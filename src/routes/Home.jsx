import { useContext, useRef, useEffect } from "react";
import { PageContext, TvDataContext, MovieDataContext, MyListContext } from "../routes/Root";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
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
  const { myList, setMyList } = useContext(MyListContext);
  const { setCurrentPage } = useContext(PageContext);
  const movieCarouselRef = useRef(null);
  const tvCarouselRef = useRef(null);

  useEffect(() => {
    // Load myList from local storage on component mount
    const storedList = localStorage.getItem('myList');
    if (storedList) {
      setMyList(JSON.parse(storedList));
    }
  }, [setMyList]);

  useEffect(() => {
    // Save myList to local storage whenever it changes
    localStorage.setItem('myList', JSON.stringify(myList));
  }, [myList]);

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
                <RoundButton onClick={() => handleAddToList(movie)}><FontAwesomeIcon icon={faPlus} /></RoundButton>
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
                <RoundButton onClick={() => handleAddToList(tv)}><FontAwesomeIcon icon={faPlus} /></RoundButton>
                <p>{tv.overview}</p>
              </DescriptionPopup>
            </MovieItem>
          ))}
        </CarouselContainer>
        <ScrollRightButton onClick={() => scrollRight(tvCarouselRef)}>›</ScrollRightButton>
      </MovieCarousel>

      {/* MY LIST SECTION */}
      {/* <h2>My List</h2>
      <MovieCarousel>
        <ScrollLeftButton onClick={() => scrollLeft(myListRef)}>‹</ScrollLeftButton>
        <CarouselContainer ref={myListRef}>
          {myList && myList.map((list) => (
            <MovieItem key={list.id}>
              <img
                className="movie-image"
                src={`https://image.tmdb.org/t/p/w500/${list.poster_path}`}
                alt={list.name || list.title}
              />
              <DescriptionPopup className="description">
                <img className="backdrop-image" src={`https://image.tmdb.org/t/p/original/${list.backdrop_path}`} alt="" />
                <RoundButton onClick={() => handleRemoveFromList(list.id)}><FontAwesomeIcon icon={faMinus} /></RoundButton>
                <p>{list.overview}</p>
              </DescriptionPopup>
            </MovieItem>
          ))}
        </CarouselContainer>
        <ScrollRightButton onClick={() => scrollRight(myListRef)}>›</ScrollRightButton>
      </MovieCarousel> */}

      <Button onClick={incrementPage}>Next</Button>
    </main>
  );
}
