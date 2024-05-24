import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MovieItem } from "../components/CarouselComponents";
import DescriptionPopup from "../components/DescriptionPopup";
import { useContext } from "react";
import { MyListContext } from "./Root";
import { RoundButton } from "../components/CarouselComponents";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const MyListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
    gap: 20px;
    list-style: none;
    height: 100vh;
    width: 100%;
    margin-top: 2rem;

    & .mylist-image {
        box-shadow: -5px 5px 5px #000000;
        width: 100%;
    }

    & .description {
        
    }
`
export default function MyList() {
  const { myList, setMyList } = useContext(MyListContext);

  function handleRemoveFromList(movieId) {
    setMyList((prevList) => prevList.filter((movie) => movie.id !== movieId));
  }

  return (
    <div className="my-list">
        <MyListWrapper>
          {myList.map((list) => (
            <MovieItem key={list.id}>
              <img
                className="mylist-image"
                src={`https://image.tmdb.org/t/p/w500/${list.poster_path}`}
                alt={list.name || list.title}
              />
              <DescriptionPopup className="description">
                <img
                  className="backdrop-image"
                  src={`https://image.tmdb.org/t/p/original/${list.backdrop_path}`}
                  alt=""
                />
                <Link to={`/details/${list.id}`}>
                  <RoundButton><FontAwesomeIcon icon={faPlay} /></RoundButton>
                </Link>
                <RoundButton onClick={() => handleRemoveFromList(list.id)}>
                  <FontAwesomeIcon icon={faMinus} />
                </RoundButton>
                <p>{list.overview}</p>
              </DescriptionPopup>
            </MovieItem>
          ))}
        </MyListWrapper>
    </div>
  );
}
