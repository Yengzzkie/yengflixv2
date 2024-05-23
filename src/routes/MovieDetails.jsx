import { useContext } from "react";
import { useParams } from "react-router-dom";
import { MovieDataContext } from "./Root";
import styled from "styled-components";

export default function MovieDetails() {
  const { data } = useContext(MovieDataContext);
  const { movieId } = useParams(); 

  const MovieDetail = styled.div`
    height: 500px;
    width: 100vw;

    & img {
      width: 100%;
    }
  `

  const viewingMovie = data.find(movie => movie.id === parseInt(movieId));

  if (!viewingMovie) {
    return <p>Movie not found</p>; 
  }

  return (
    <MovieDetail>
      <img 
        src={`https://image.tmdb.org/t/p/original/${viewingMovie.poster_path}`} 
        alt={viewingMovie.title}
      />
      <h1>{viewingMovie.title}</h1>
      <p>{viewingMovie.overview}</p>

    </MovieDetail>
  );
}
