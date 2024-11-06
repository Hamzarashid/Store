import styled from "styled-components";

export const HeaderContainer = styled.div`
  text-align: center;
`;

export const Title = styled.h2`
  position: relative;
  display: inline-block;
  margin: 0;
  padding: 0 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    width: 100px;
    height: 1px;
    background-color: #ccc;
  }

  &:before {
    left: -120px;
  }

  &:after {
    right: -120px;
  }
      @media (max-width: 768px) {
    &:before,
    &:after {
      display: none;  
    }
`;

export const Subtitle = styled.p`
  margin: 10px 0 0;
  font-style: italic;
  color: #777;
`;
