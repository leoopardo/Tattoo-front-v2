import styled from "styled-components";

export const LoadingDiv = styled.div`
  height: 100%;
  width: 100%;
  filter: opacity(60%) hue-rotate(90deg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const NavbarDiv = styled.div`
  height: 100%;
  width: 25%;
  background-color: #171b22;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LandingDiv = styled.div`
  width: 70%;
  margin-left: 3%;
  margin-top: 15%;
  text-align: center;
  color: #C0C8D6;
  font-family: 'UnifrakturMaguntia', cursive;
`;
