"use client";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  /* Apply font family */
  html,
  body {
    font-family: "Poppins", sans-serif;
    /* Add other global styles as needed */
  }

  body {
    margin: 0;
    padding: 0;
  }

  main {
    min-height: calc(100vh - (23.8vh + 2.57vh));
  }

  .ant-divider-vertical {
    height: 1.8em;
    border-inline-start: 2px solid rgba(5, 5, 5, 0.06);
  }

`;

export const Price = styled.h4`
  margin: 0;
  & span {
    margin-right: 10px;
    color: #888;
  }
`;
export default GlobalStyle;
