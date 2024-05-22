import { useContext, useRef } from "react";
import { PageContext, TvDataContext, MovieDataContext } from "../routes/Root";
import Button from "../styles/Button";
import styled from "styled-components";

export default function Home() {
  const { data } = useContext(MovieDataContext);
  const { tvData } = useContext(TvDataContext);
  const { setCurrentPage } = useContext(PageContext);
  const movieCarouselRef = useRef(null);
  const tvCarouselRef = useRef(null);

  const MovieCarousel = styled.div`
    position: relative;
    width: 100%;
    height: 500px;
    padding: 0 2.5rem 0 5rem;
    margin-left: 1rem;
    overflow: hidden;
  `;

  const CarouselContainer = styled.ul`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    list-style-type: none;
    padding: 0;
    margin: 0;

    &::-webkit-scrollbar {
      display: none;
    }
  `;

  const MovieItem = styled.li`
    position: relative;
    scroll-snap-align: start;
    flex: 0 0 auto;
    width: 250px;
    margin-right: 150px;

    @media screen and (max-width: 1024px) {
      margin-right: 20px;
    }
  `;

  const ScrollButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 1.5rem;
    border: none;
    padding: 20px 15px;
    cursor: pointer;
    z-index: 1;

    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
  `;

  const ScrollLeftButton = styled(ScrollButton)`
    left: 10px;
  `;

  const ScrollRightButton = styled(ScrollButton)`
    right: 10px;
  `;

  function incrementPage() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  function scrollLeft(ref) {
    ref.current.scrollBy({ left: -300, behavior: "smooth" });
  }

  function scrollRight(ref) {
    ref.current.scrollBy({ left: 300, behavior: "auto" });
  }

  return (
    <>
      <h1>Top 10 Movies</h1>
      <MovieCarousel>
        <ScrollLeftButton onClick={() => scrollLeft(movieCarouselRef)}>‹</ScrollLeftButton>
        <CarouselContainer ref={movieCarouselRef}>
          {data &&
            data.slice(0, 10).map((movie, index) => (
              <MovieItem key={movie.id}>
                <span className="toplist-number">{index + 1}</span>
                <img
                  className="movie-image"
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                />
              </MovieItem>
            ))}
        </CarouselContainer>
        <ScrollRightButton onClick={() => scrollRight(movieCarouselRef)}>›</ScrollRightButton>
      </MovieCarousel>
      
      <h1>Top 10 TV Series</h1>
      <MovieCarousel>
        <ScrollLeftButton onClick={() => scrollLeft(tvCarouselRef)}>‹</ScrollLeftButton>
        <CarouselContainer ref={tvCarouselRef}>
          {tvData &&
            tvData.slice(0, 10).map((tv, index) => (
              <MovieItem key={tv.id}>
                <span className="toplist-number">{index + 1}</span>
                <img
                  className="movie-image"
                  src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                  alt={tv.name}
                />
              </MovieItem>
            ))}
        </CarouselContainer>
        <ScrollRightButton onClick={() => scrollRight(tvCarouselRef)}>›</ScrollRightButton>
      </MovieCarousel>

      <Button onClick={incrementPage}>Next</Button>
    </>
  );
}
