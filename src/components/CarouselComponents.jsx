import styled from "styled-components";
import Button from "./Button";

const MovieCarousel = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    padding: 0 2.5rem 0 5rem;
    overflow: hidden;

    @media screen and (max-width: 1024px) {
      height: 25vh;
      padding: .5rem;
    }
`;

const CarouselContainer = styled.ul`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    list-style-type: none;
    padding: 0;
    margin: 0;

    &::-webkit-scrollbar {
      display: none;
    }
`;

const MovieItem = styled.li`
    position: relative;
    scroll-snap-align: start;
    flex: 0 0 auto;
    width: 180px;
    margin-right: 135px;

    &:hover .description {
      display: block;
    }

    h3 {
      margin: 0 1rem;
    }

    @media screen and (max-width: 1024px) {
      width: 140px;
      margin-right: 20px;
      
      &:hover .description {
        display: block;
      }
    }
`;

const ScrollButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 1.5rem;
    border: none;
    padding: 20px 15px;
    cursor: pointer;
    z-index: 1;

    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
`;

const RoundButton = styled(Button)`
    border-radius: 100%;
    width: 40px;
    height: 40px;
    padding: .5rem;
    margin: 5px;
`;

export { MovieCarousel, CarouselContainer, MovieItem, ScrollButton, RoundButton } ;