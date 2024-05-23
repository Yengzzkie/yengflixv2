import styled from "styled-components";

const DescriptionPopup = styled.div`
    display: none;
    width: 350px;
    height: 350px;
    position: absolute;
    top: -10%;
    left: 0;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
    z-index: 2;
    overflow: auto;
    animation: popUp .3s linear forwards;

    &::-webkit-scrollbar {
      display: none;
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