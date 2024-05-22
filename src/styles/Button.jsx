import styled from "styled-components";

const Button = styled.button`
    background: transparent;
    color: #fff;
    border: 1.5px solid #fff;
    border-radius: 5px;
    padding: .5rem 1rem;
    cursor: pointer;

    &:hover {
        background: red;
    }
`;

export default Button;