import styled from "styled-components";

export const ParentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ReviewsContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: start;
  flex-direction: column;
  width: 90%;
  max-width: 1080px;
  padding: 30px;

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const ReviewsTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & div {
    display: flex;
    gap: 10px;
  }

  & span {
    font-size: 16px;
    font-weight: normal;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 10px;
  }
`;

export const ReviewsTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

export const CarouselWrap = styled.div`
  position: relative;

  .slick-track {
    display: flex;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
  }

  .slick-slide > div {
    display: flex;
    justify-content: center;
  }

  .slick-arrow {
    color: #4d4c4c;
    font-size: 24px;
    z-index: 1;
  }
`;

export const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 54px 0 0 0;
`;

export const Arrow = styled.div`
  cursor: pointer;
  font-size: 24px;
  z-index: 1;
  color: #8c8c8c;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  &.prev {
    left: calc(50% - 20px);
  }

  &.next {
    left: calc(50% + 20px);
  }
`;

export const CustomArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  z-index: 1;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  &.prev {
    left: calc(50% - 60px); /* Adjusted for icon size */
  }

  &.next {
    left: calc(50% + 60px); /* Adjusted for icon size */
  }
`;

export const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 10px 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 768px) {
    margin: auto;
  }

  @media (max-width: 480px) {
    margin: auto;
  }
`;

export const Title = styled.h3`
  font-size: 18px;
  margin: 0;
  color: #333;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #666;
`;
