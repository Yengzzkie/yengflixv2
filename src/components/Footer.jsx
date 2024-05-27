import styled from "styled-components";

const FooterDiv = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 70px;
  box-shadow: 0 -5px 5px #000000;
  background-color: #141414;
  z-index: 99;
`;

export default function Footer() {
  return (
    <FooterDiv>Yengzzkie Dzigntech &copy;</FooterDiv>
  );
}
