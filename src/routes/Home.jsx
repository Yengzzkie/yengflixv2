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
    height: 450px;
    padding: 0 2.5rem 0 5rem;
    overflow: hidden;

    @media screen and (max-width: 1024px) {
      height: 220px;
    }
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
    width: 180px;
    margin-right: 135px;

    &:hover .description {
      display: block;
    }

    @media screen and (max-width: 1024px) {
      width: 145px;
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
  
  const Description = styled.div`
    display: none;
    width: 300px;
    height: 350px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    z-index: 2;
    overflow: auto;
    animation: popUp .3s linear forwards;

    &::-webkit-scrollbar {
      display: none;
    }

    & p {
      margin: 1rem;
    }

    @keyframes popUp {
      from {
        transform: scale(0)
      }
      to {
        transform: scale(1)
      }
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
    ref.current.scrollBy({ left: 300, behavior: "smooth" });
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
                <Description className="description">
                  <img className="backdrop-image" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="" />
                  <p>{movie.overview}</p>
                </Description>
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
                <Description className="description">
                  <img className="backdrop-image" src={`https://image.tmdb.org/t/p/original/${tv.backdrop_path}`} alt="" />
                  <p>{tv.overview}</p>
                </Description>
              </MovieItem>
            ))}
        </CarouselContainer>
        <ScrollRightButton onClick={() => scrollRight(tvCarouselRef)}>›</ScrollRightButton>
      </MovieCarousel>

      <Button onClick={incrementPage}>Next</Button>
    </>
  );
}
