import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AllMoviesContext, MovieDataContext, TvDataContext, MyListContext, AllTVContext, AddedToListContext, CurrentDateContext, SearchResultContext, RecentlyViewedContext } from "../utils/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { RoundButton } from "../components/CarouselComponents";
import VideoType from "../components/VideoType";
import Title from "../components/Title";
import Player from "../components/Player";
import styled from "styled-components";

const PlayerWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

const MovieDetail = styled.div`
  position: relative;
  display: flex;
  background: linear-gradient(to left, #141414c7, #141414ab, #14141461, #14141424, #14141400);
  width: 100%;
  height: auto;
  padding: 2rem 0;

  & .details-description-wrapper {
    width: 50vw;
    margin: 0 5rem 0 2rem;
  }

  & h1 {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  & .rating {
    margin-bottom: .5rem;
  }

  & .image-wrapper {
    position: relative;
    width: 350px;
    height: auto;

    & img {
      position: relative;
      width: 100%;
      margin-right: 1rem;
      z-index: -1;
    }

    & .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to left, #141414f7, #141414db, #14141499, #14141457, #14141400);
      z-index: 0;
      margin-right: 10px;
    }
  }

  @media screen and (max-width: 1024px) {
    font-size: .7rem;

    .details-description-wrapper {
      width: 100vw;
      margin: 0 .5rem 0 .2rem;

      & .rating {
        margin-bottom: .5rem;
      }
    }
  }
`;

export default function MoviePlayer() {
  const { data } = useContext(MovieDataContext);
  const { movies } = useContext(AllMoviesContext);
  const { topTV } = useContext(TvDataContext);
  const { tvSeries } = useContext(AllTVContext);
  const { myList, setMyList } = useContext(MyListContext);
  const { added, setAdded } = useContext(AddedToListContext);
  const { currentDate, setCurrentDate } = useContext(CurrentDateContext);
  const { searchResults } = useContext(SearchResultContext);
  const { setRecentlyViewed } = useContext(RecentlyViewedContext);
  const { movieId } = useParams();

  const viewingTopMovie = data?.find(data => data.id === parseInt(movieId));
  const viewingMovie = movies?.find(movie => movie.id === parseInt(movieId));
  const viewingTv = topTV?.find(tv => tv.id === parseInt(movieId));
  const viewingSeries = tvSeries?.find(series => series.id === parseInt(movieId));
  const viewingList = myList?.find(series => series.id === parseInt(movieId));
  const viewingSearchResult = searchResults?.find(result => result.id === parseInt(movieId));

  const viewingContent = viewingSearchResult || viewingList || viewingTopMovie || viewingMovie || viewingTv || viewingSeries;

  useEffect(() => {
    setCurrentDate(new Date());
  }, [setCurrentDate]);

  useEffect(() => {
    if (viewingContent) {
      setTimeout(() => {
        handleAddToRecent(viewingContent);
      }, 1000);
    }
  }, [viewingContent]);
  

  if (!viewingContent) {
    return <h1>Content not found</h1>;
  }

  const isMovie = viewingContent.type === "movie" || viewingContent.media_type === "movie";

  const iframeSrc = isMovie
    ? `https://vidsrc.xyz/embed/movie/${viewingContent.id}`
    : `https://vidsrc.xyz/embed/tv/${viewingContent.id}`;

  function handleAddToList(newMovie) {
    setMyList(prevList => {
      const updatedList = prevList || [];
      if (!updatedList.some(movie => movie.id === newMovie.id)) {
        return [...updatedList, newMovie];
      }
      return updatedList;
    });
  }

  function handleAddToRecent(newMovie) {
    setRecentlyViewed(prevList => {
      const updatedList = prevList || [];
      if (!updatedList.some(movie => movie.id === newMovie.id)) {
        const newRecentlyViewed = [...updatedList, newMovie];
        localStorage.setItem("recentlyViewed", JSON.stringify(newRecentlyViewed));
        return newRecentlyViewed;
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
  

  const releaseDate = new Date(viewingContent.release_date || viewingContent.first_air_date);
  const comingSoon = releaseDate > currentDate ? "Coming Soon" : null;

  return (
    <PlayerWrapper>
      <Player>
        <iframe src={iframeSrc} allowFullScreen={true}></iframe>
      </Player>

      <MovieDetail>
        <div className="image-wrapper">
          <img
            src={`https://image.tmdb.org/t/p/original/${viewingContent.poster_path}`}
            alt={viewingContent.title || viewingContent.name}
          />
          <div className="image-overlay"></div>
        </div>

        <div className="details-description-wrapper">
          <Title>{viewingContent.title || viewingContent.name} <VideoType>{viewingContent.media_type}</VideoType></Title>
          {comingSoon ? <p className="coming-soon">{comingSoon}</p> : null}
          <p>
            <strong>Released:</strong> {viewingContent.release_date || viewingContent.first_air_date}
          </p>
          <p className="rating"><strong>Rating:</strong> {Math.round(viewingContent.vote_average)} / 10</p>
          <p>{viewingContent.overview}</p>
          <RoundButton onClick={() => handleClick(viewingContent)}>{added ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faPlus} />}</RoundButton>
        </div>
      </MovieDetail>
    </PlayerWrapper>
  );
}
