import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
 :root {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  /* color-scheme: light dark; */
  /* color: rgba(255, 255, 255, 0.87); */
  background-color: #fff;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}


/* @media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #fafafa;
  }
} */

  body {
  font-family: 'Space Grotesk', sans-serif;
    background:#ffffff;
    a{
      color:#000000;
      text-decoration:none;
      &:hover{
      }
    }
  }

  *{
    margin:0px;
    padding:0px;
    box-sizing:border-box
  }


`;

export const OtcBg = styled.div``;

export const Dashboard = styled.div`
  display: flex;
`;
