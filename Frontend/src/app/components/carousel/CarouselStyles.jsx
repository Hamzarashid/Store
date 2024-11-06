import { Carousel } from "antd";
import Image from "next/image";
import styled from "styled-components";

export const StyledCarousel = styled(Carousel)`
  width: 100%;
  height: 100%;
`;

export const CarouselItem = styled.div`
  position: relative;
  height: 700px;
`;

export const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
