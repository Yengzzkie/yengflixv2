import styled from "styled-components";

const DescriptionPopup = styled.div`
    display: none;
    position: absolute;
    top: -15%;
    left: 0;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
    font-size: .9rem;
    width: 330px;
    min-width: 25vw;
    height: 380px;
    z-index: 999;
    overflow: auto;
    animation: popUp .3s linear forwards;

    &::-webkit-scrollbar {
      display: none;
    }

    & h1 {
      margin: 0.5rem 1rem;
    }

    & p {
      margin: 1rem;
    }

    @keyframes popUp {
      from {
        transform: scale(0)
      }
      to {
        transform: scale(1)
      }
    }
`;

export default DescriptionPopup;