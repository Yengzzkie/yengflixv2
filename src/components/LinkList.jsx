import styled from "styled-components";

const LinkList = styled.ul`
    display: flex;
    align-items: center;
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

      li {
        margin-bottom: 1rem;
      }
    }
  `

export default LinkList;