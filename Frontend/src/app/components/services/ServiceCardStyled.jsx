import styled from "styled-components";
import { Carousel, Row } from "antd";

export const ServiceCardWrapper = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: none;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const IconWrapper = styled.div`
  font-size: 36px;
  color: #1890ff;
  margin-bottom: 16px;
  padding: 8px 12px;
  border-radius: 50%;
  border: 1px solid transparent;
  transition: border 0.3s ease;

  &:hover {
    color: white;
    border: 1px solid #ddd;
    background-color: #7b0323;
  }
`;

export const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #757575;
`;

export const ResponsiveCarousel = styled(Carousel)`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const ServiceCardRow = styled(Row)`
  @media (max-width: 768px) {
    display: none;
  }
`;
