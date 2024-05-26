import styled from "styled-components";
import Button from "./Button";

const NextPrevButton = styled(Button)`
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    padding: 2rem 1rem;

    @media screen and (max-width: 1024px) {
        background: #000000eb;
        padding: 1.3rem .6rem;
    }
`

export default NextPrevButton; 