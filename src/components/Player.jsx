import styled from "styled-components";

const Player = styled.div`
  width: auto;
  height: auto;
  z-index: 999;

  & iframe {
    width: 100%;
    height: 90vh;
  }

  @media screen and (max-width: 1024px) {
    iframe {
      height: 45vh;
    }
  }
`;

export default Player;