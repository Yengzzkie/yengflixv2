import { useContext } from "react";
import { useParams } from "react-router-dom";
import { MovieDataContext, TvDataContext } from "./Root";
import styled from "styled-components";

const PlayerWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Player = styled.div`
  width: auto;
  height: auto;

  & iframe {
    width: 100%;
    height: 100vh;
  }

  @media screen and (max-width: 1024px) {
    iframe {
      height: 45vh;
    }
  }
`;

const MovieDetail = styled.div`
  position: relative;
  display: flex;
  background: linear-gradient(to left, #141414f7, #141414db, #14141499, #14141457, #14141400);
  width: 100%;
  height: auto;
  padding: 2rem 0;

  & .details-description-wrapper {
    width: 50vw;
    margin: 0 5rem 0 2rem;
  }

  h1 {
    margin-bottom: 1rem;
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

    & .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to left, #141414f7, #141414db, #14141499, #14141457, #14141400);
      z-index: 0;
    }

    & .rating {
      position: relative;
      margin: .5rem;
      z-index: 99999;
    }
  }

  @media screen and (max-width: 1024px) {
    font-size: .7rem;

    .details-description-wrapper {
      width: 100vw;
      margin: 0 .5rem 0 .2rem;
    }
  }
`

export default function MoviePlayer() {
  const { data } = useContext(MovieDataContext);
  const { tvData } = useContext(TvDataContext);
  const { movieId } = useParams();

  const viewingMovie = data.find(movie => movie.id === parseInt(movieId));
  const viewingTv = tvData.find(tv => tv.id === parseInt(movieId));

  const viewingContent = viewingMovie || viewingTv;

  if (!viewingContent) {
    return <p>Content not found</p>;
  }

  const isMovie = !!viewingMovie;
  const iframeSrc = isMovie
    ? `https://vidsrc.xyz/embed/movie/${viewingContent.id}`
    : `https://vidsrc.xyz/embed/tv/${viewingContent.id}`;

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
          <p className="rating"><strong>Released:</strong> {viewingContent.release_date || viewingContent.first_air_date}</p>
          <p className="rating"><strong>Rating:</strong> {Math.round(viewingContent.vote_average)} / 10</p>
          <div className="overlay"></div>
        </div>

        <div className="details-description-wrapper">
          <h1>{viewingContent.title || viewingContent.name}</h1>
          <p>{viewingContent.overview}</p>
        </div>
      </MovieDetail>
    </PlayerWrapper>
  );
}
