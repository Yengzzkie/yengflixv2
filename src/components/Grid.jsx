import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13vw, 1fr));
  gap: 25px;
  list-style: none;
  width: 100%;
  padding: 1rem 5rem;
  margin-top: 2rem;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(25vw, 1fr));
    padding: 1rem;
  }
`;

export default Grid;
