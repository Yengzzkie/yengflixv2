import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MovieItem } from "../components/CarouselComponents";
import DescriptionPopup from "../components/DescriptionPopup";
import { useContext } from "react";
import { MyListContext } from "./Root";
import { RoundButton } from "../components/CarouselComponents";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

export default function MyList() {
  const { myList, setMyList } = useContext(MyListContext);

  function handleRemoveFromList(movieId) {
    setMyList((prevList) => prevList.filter((movie) => movie.id !== movieId));
  }

  return (
    <>
      {myList.map((list) => {
        <MovieItem key={list.id}>
          <img
            className="movie-image"
            src={`https://image.tmdb.org/t/p/w500/${list.poster_path}`}
            alt={list.name || list.title}
          />
          <DescriptionPopup className="description">
            <img
              className="backdrop-image"
              src={`https://image.tmdb.org/t/p/original/${list.backdrop_path}`}
              alt=""
            />
            <RoundButton onClick={() => handleRemoveFromList(list.id)}>
              <FontAwesomeIcon icon={faMinus} />
            </RoundButton>
            <p>{list.overview}</p>
          </DescriptionPopup>
        </MovieItem>;
      })}
    </>
  );
}
