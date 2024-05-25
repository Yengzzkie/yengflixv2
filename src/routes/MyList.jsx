import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { MyListContext } from "./Root";
import { RoundButton } from "../components/CarouselComponents";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import ImageCard from "../components/ImageCard";
import Grid from "../components/Grid";

const MyListItems = styled.li`
  position: relative;
  margin: 0;

  &:hover {
    .description {
      display: block;
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
      width: 25vw;
      height: 40vh;

      & button {
        width: 30px;
        height: 30px;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    button {
      font-size: .7rem;
      width: 30px;
      height: 30px;
    }
  }
`;

export default function MyList() {
  const { myList, setMyList } = useContext(MyListContext);

  function handleRemoveFromList(movieId) {
    setMyList((prevList) => prevList.filter((movie) => movie.id !== movieId));
  }

  return (
    <div className="my-list">
      <Grid>
        {myList.map((list) => (
          <MyListItems key={list.id}>
            <ImageCard
              className="mylist-image"
              src={`https://image.tmdb.org/t/p/w500/${list.poster_path}`}
              alt={list.name || list.title}
            />
            <Link to={`/details/${list.id}`}>
              <RoundButton>
                <FontAwesomeIcon icon={faPlay} />
              </RoundButton>
            </Link>
            <RoundButton onClick={() => handleRemoveFromList(list.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </RoundButton>
          </MyListItems>
        ))}
      </Grid>
    </div>
  );
}
