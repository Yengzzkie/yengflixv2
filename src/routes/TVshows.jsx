import { useContext } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { TvPageContext, MyListContext, AddedToListContext, AllTVContext, CurrentDateContext } from "../utils/context";
import { RoundButton } from "../components/CarouselComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCheck, faPlus, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Grid from "../components/Grid";
import ImageCard from "../components/ImageCard";
import VideoType from "../components/VideoType";
import Title from "../components/Title";
import DescriptionPopup from "../components/DescriptionPopup";
import NextPrevButton from "../components/NextPrevButton";
import NewBadge from "../components/NewBadge";
import styled from "styled-components";
import { notifyError, notifySuccess } from "../components/ToastNotification";

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

export default function TVshows() {
  const { tvSeries } = useContext(AllTVContext);
  const { setTvPage } = useContext(TvPageContext);
  const { setMyList } = useContext(MyListContext);
  const { added, setAdded } = useContext(AddedToListContext);
  const { currentDate } = useContext(CurrentDateContext);

  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  function incrementPage() {
    setTvPage((prevPage) => prevPage + 1);
  }

  function decrementPage() {
    setTvPage((prevPage) => {
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

  const threeMonthsAgo = new Date(currentDate);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  return (
    <Grid>
      {tvSeries &&
        tvSeries.map((series) => {
          const releaseDate = new Date(series.first_air_date);
          const isNew = releaseDate >= threeMonthsAgo && releaseDate <= currentDate;

          return (
            <MovieList key={series.id}>
              {isMobile ? (
                <Link to={`/details/${series.id}`}>
                  <ImageCard
                    src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}
                    alt={series.name}
                  />
                </Link>
              ) : (
                <ImageCard
                  src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}
                  alt={series.name}
                />
              )}
              {!isMobile && (
                <DescriptionPopup className="description">
                  <img
                    className="backdrop-image"
                    src={`https://image.tmdb.org/t/p/original/${series.backdrop_path}`}
                    alt=""
                  />
                  <Link to={`/details/${series.id}`}>
                    <RoundButton>
                      <FontAwesomeIcon icon={faPlay} />
                    </RoundButton>
                  </Link>
                  <RoundButton onClick={() => handleClick(series)}>
                    {added ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faPlus} />
                    )}
                  </RoundButton>
                  <VideoType>{series.type}</VideoType>
                  <Title>{series.name}{isNew && <NewBadge>NEW</NewBadge>}</Title>
                  <p className="release-date">{series.first_air_date}</p>
                  <p>{series.overview}</p>
                </DescriptionPopup>
              )}
            </MovieList>
          );
        })}
      <PrevButton onClick={decrementPage}><FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon></PrevButton>
      <NextButton onClick={incrementPage}><FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon></NextButton>
    </Grid>
  );
}
