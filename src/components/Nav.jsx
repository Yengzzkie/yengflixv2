import styled from "styled-components";

const Nav = styled.nav`
  position: sticky;
  top: 0; 
  display: flex;
  align-items: center;
  background: #141414;
  box-shadow: 0 5px 3px #212121;
  width: 100vw;
  height: 60px;
  padding: 1rem;

  @media screen and (max-width: 1024px) {
    backdrop-filter: blur(5px);
    position: fixed;
    flex-direction: column;
    top: 0;
    height: 100vh;
    width: 55vw;
    padding-top: 3rem;
  }
`;

export default Nav;
