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
  z-index: 1000; /* Ensure it stays above other content */
`;

export default Nav;
