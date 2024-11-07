import styled from "styled-components";
import { Carousel } from "antd";

export const StyledCarousel = styled(Carousel)`
  width: 100%;
  margin: 0 auto;

  .slick-slide {
    text-align: center;
    overflow: hidden;
  }

  .slick-dots li button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
`;

export const CarouselItem = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 50%;

  @media (max-width: 768px) {
    padding-top: 50%;
  }

  @media (max-width: 480px) {
    padding-top: 50%;
  }
  @media (max-width: 320px) {
    padding-top: 50%;
  }
`;

export const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;
