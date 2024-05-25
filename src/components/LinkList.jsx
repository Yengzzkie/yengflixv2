import styled from "styled-components";

const LinkList = styled.ul`
    display: flex;
    list-style: none;
    width: 100%;
    margin-left: 1rem;

    input {
      align-self: flex-end;
    }

    @media screen and (max-width: 1024px) {
      flex-direction: column;
      justify-content: space-between;
      width: 50vw;
    }
  `

export default LinkList;