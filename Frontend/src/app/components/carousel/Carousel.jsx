"use client";
import { carouselImages } from "../../constants";
import { CarouselItem, StyledCarousel, StyledImage } from "./CarouselStyles";

export default function Carousel() {
  return (
    <StyledCarousel autoplay autoplaySpeed={2000}>
      {carouselImages.map((image, index) => (
        <CarouselItem key={index}>
          <StyledImage src={image.src} alt={image.alt} fill />
        </CarouselItem>
      ))}
    </StyledCarousel>
  );
}
