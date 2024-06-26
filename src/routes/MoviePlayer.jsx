import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AllMoviesContext, MovieDataContext, TvDataContext, MyListContext, AllTVContext, AddedToListContext, CurrentDateContext, SearchResultContext, RecentlyViewedContext, ContinueWatchContext } from "../utils/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { RoundButton } from "../components/CarouselComponents";
import { notifySuccess, notifyError } from "../components/ToastNotification";
import VideoType from "../components/VideoType";
import Title from "../components/Title";
import Player from "../components/Player";
import NewBadge from "../components/NewBadge";
import Button from "../components/Button";
import styled from "styled-components";

const PlayerWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  animation: scaleUp .3s;

  @keyframes scaleUp {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
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
  const server1 = 'https://vidsrc.xyz/embed/movie/';
  const server2 = 'https://2embed.org/embed/movie/';

  const { data } = useContext(MovieDataContext);
  const { movies } = useContext(AllMoviesContext);
  const { topTV } = useContext(TvDataContext);
  const { tvSeries } = useContext(AllTVContext);
  const { myList, setMyList } = useContext(MyListContext);
  const { added, setAdded } = useContext(AddedToListContext);
  const { currentDate, setCurrentDate } = useContext(CurrentDateContext);
  const { searchResults } = useContext(SearchResultContext);
  const { setRecentlyViewed } = useContext(RecentlyViewedContext);
  const { setContinueWatch } = useContext(ContinueWatchContext);
  const [server, setServer] = useState(server1);
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
      const recentTimeout = setTimeout(() => {
        handleAddToRecent(viewingContent);
      }, 1000);

      const continueWatchTimeout = setTimeout(() => {
        handleAddToContinueWatching(viewingContent);
      }, 120000);

      return () => {
        clearTimeout(recentTimeout);
        clearTimeout(continueWatchTimeout);
      };
    }
  }, [viewingContent]);

  if (!viewingContent) {
    return <h1>Content not found</h1>;
  }

  const isMovie = viewingContent.type === "movie" || viewingContent.media_type === "movie";

  const iframeSrc = isMovie
    ? `${server}${viewingContent.id}`
    : `https://vidsrc.xyz/embed/tv/${viewingContent.id}`;

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

  function handleAddToRecent(newMovie) {
    setRecentlyViewed(prevList => {
      let updatedList = prevList || [];
  
      updatedList = updatedList.filter(movie => movie.id !== newMovie.id);
      updatedList.unshift(newMovie);

      if (updatedList.length > 15) {
        updatedList.pop();
      }
      localStorage.setItem("recentlyViewed", JSON.stringify(updatedList));
      return updatedList;
    });
  }
  

  function handleAddToContinueWatching(newMovie) {
    setContinueWatch(prevList => {
      let updatedList = prevList || [];

      updatedList = updatedList.filter(movie => movie.id !== newMovie.id);
      updatedList.unshift(newMovie);
  
      if (updatedList.length > 15) {
        updatedList.pop();
      }
      localStorage.setItem("continueWatch", JSON.stringify(updatedList));
      return updatedList;
    });
  }
  
  function handleServerChange() {
    setServer(server === server1 ? server2 : server1)
    window.scrollTo(0, 0);
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
  
  const threeMonthsAgo = new Date(currentDate);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const isNew = releaseDate >= threeMonthsAgo && releaseDate <= currentDate;

  return (
    <PlayerWrapper>
      <Player onClick={() => handleAddToContinueWatching(viewingContent)}>
        <iframe src={iframeSrc} allowFullScreen={true} referrerPolicy="origin"></iframe>
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
          <Title>{viewingContent.title || viewingContent.name} {isNew && <NewBadge>NEW</NewBadge>} <VideoType>{viewingContent.type || viewingContent.media_type}</VideoType></Title>
          {comingSoon ? <p className="coming-soon">{comingSoon}</p> : null}
          <p>
            <strong>Released:</strong> {viewingContent.release_date || viewingContent.first_air_date}
          </p>
          <p className="rating"><strong>Rating:</strong> {Math.round(viewingContent.vote_average)} / 10</p>
          <p>{viewingContent.overview}</p>
          <RoundButton onClick={() => handleClick(viewingContent)}>{added ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faPlus} />}</RoundButton>
          <Button onClick={handleServerChange}>{server === server1 ? "Server 2" : "Server 1"}</Button>
          <br /><em>If the video does not work, try changing the server by clicking the button above</em>
        </div>
      </MovieDetail>
    </PlayerWrapper>
  );
}
