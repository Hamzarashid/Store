import { Button, Flex } from "antd";
import NextImage from "next/image";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-20px);
    }
`;

const drawBorder = keyframes`
  0% {
    width: 0;
    height: 0;
    border-width: 1px 0 0 1px;
  }
  25% {
    width: 100%;
    height: 100%;
    border-width: 1px 0 0 1px;
  }
  100% {
    width: 100%;
    height: 100%;
    border-width: 1px 1px 1px 1px;
  }
`;

export const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  cursor: pointer;
  &:hover {
    border-color: #000;
  }
`;

export const CardsContainer = styled.div`
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`;

export const CarouselWrap = styled.div`
  border: 1px solid #1fc5e6;
  .slick-arrow {
    color: #4d4c4c;
  }
`;
export const Wrap = styled(CarouselWrap)`
  margin: 0;
`;

export const Heading = styled.h2`
  text-align: center;
`;

export const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0px 16px;
`;

export const Arrow = styled.div`
  cursor: pointer;
  font-size: 24px;
  margin: 0 10px;
  z-index: 1;
  color: #8c8c8c;

  &.prev {
    position: absolute;
    right: 40px;
    transform: translateY(-50%);
    top: 50%;
  }

  &.next {
    position: absolute;
    right: 0;
    transform: translateY(-50%);
    top: 50%;
  }
`;

export const CustomArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  z-index: 1;

  &.prev {
    position: absolute;
    left: -30px;
    top: 50%;
    transform: translateY(-50%);
  }

  &.next {
    position: absolute;
    right: -30px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const Image = styled(NextImage)`
  border-radius: 10px;
  scale: 0.9;
  transition: scale 0.3s ease-in-out;
  object-fit: fill;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
`;

export const AddToCart = styled.div`
  scale: 0.99;
  position: absolute;
  cursor: pointer;
  bottom: 0;
  background-color: #7b0323;
  color: #000;
  font-weight: 600;
  width: 100%;
  height: 0.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: scale 0.3s ease-in-out;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  span {
    display: none;
  }
  p {
    text-align: center;
    margin: 0;
    opacity: 1;
    animation-fill-mode: forwards;
  }
  &:hover {
    background-color: #7b0323;
    p {
      animation: ${fadeOut} 0.3s ease forwards;
      height: 0;
    }
    span {
      display: block;
      animation: ${fadeIn} 0.3s ease forwards;
      font-size: 20px;
    }
  }
`;

export const Heart = styled.div`
  position: absolute;
  text-align: center;
  cursor: pointer;
  width: 10px;
  height: 30px;
  opacity: 0;
  font-size: 20px;
  top: 4px;
  left: 7.5px;
  z-index: 1000;
  color: #7b0323;
  transition: width 0.3s, font-size 0.3s, opacity 0.3s;
  & HeartFilled {
    color: "#7B0323";
  }
`;
export const Discount = styled.div`
  position: absolute;
  text-align: center;
  top: -12px;
  right: 15px;

  p {
    background-color: #7b0323;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 43px;
    height: 43px;
    border-radius: 50px;
    color: #fff;
  }
`;
export const Title = styled.p`
  display: inline;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
  font-weight: 500;
`;

export const Card = styled.div`
  flex: 1 1 calc(${(props) => 100 / props.cardsToShow}% - 16px);
  padding: 0 0 16px 0;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  width: min-content;
  &:hover::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    animation: ${drawBorder} 0.9s forwards;
  }

  &:hover ${Image} {
    scale: 0.99;
  }

  &:hover ${AddToCart} {
    height: 35px;
    color: #fff;
    transition: height 0.3s;
  }

  &:hover ${Heart} {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    opacity: 1;
  }

  &:hover ${Title} {
    color: #7b0323;
  }

  @media (max-width: 1200px) {
    flex: 1 1
      calc(
        ${(props) => 100 / (props.cardsToShow > 3 ? 3 : props.cardsToShow)}% -
          16px
      );
  }

  @media (max-width: 900px) {
    flex: 1 1
      calc(
        ${(props) => 100 / (props.cardsToShow > 2 ? 2 : props.cardsToShow)}% -
          16px
      );
  }

  @media (max-width: 600px) {
    flex: 1 1 calc(100% - 16px);
  }
`;

export const CardInner = styled(Flex)`
  position: relative;
  padding: 0 15px 0 15px;
`;

export const InnerNested = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Price = styled.h4`
  margin: 0;
  & span {
    margin-right: 10px;
    color: #888;
  }
`;

export const LoadMore = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  padding: 20px 20px;
  border-radius: 100px;
  background: #7b0323;
  color: white;
  transition: background 0.3s ease, color 0.3s ease;

  &&:hover {
    background: #7b0323;
    color: white;
  }
`;
