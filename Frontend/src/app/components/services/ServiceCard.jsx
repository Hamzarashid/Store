"use client";
import {
  CarOutlined,
  CustomerServiceOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { Col } from "antd";
import {
  Description,
  IconWrapper,
  ServiceCardWrapper,
  Title,
  ResponsiveCarousel,
  ServiceCardRow,
} from "./ServiceCardStyled";
import { useResponsive } from "../../hooks/useResponsive";

const services = [
  {
    icon: <CarOutlined />,
    title: "FAST SHIPPING",
    description: "Fast & reliable shipping",
  },
  {
    icon: <CustomerServiceOutlined />,
    title: "SUPPORT 24/7",
    description: "Contact us 24 hours a day, 7 days a week",
  },
  {
    icon: <SwapOutlined />,
    title: "FREE RETURNS",
    description: "Free Returns / Exchange",
  },
];

const ServicesCard = () => {
  const screenSize = useResponsive();

  return (
    <>
      {screenSize === "mobile" && (
        <ResponsiveCarousel dots autoplay>
          {services.map((service, index) => (
            <ServiceCardWrapper key={index}>
              <IconWrapper>{service.icon}</IconWrapper>
              <Title>{service.title}</Title>
              <Description>{service.description}</Description>
            </ServiceCardWrapper>
          ))}
        </ResponsiveCarousel>
      )}

      {(screenSize === "tablet" || screenSize === "desktop") && (
        <ServiceCardRow justify="center" align="middle">
          {services.map((service, index) => (
            <Col span={8} key={index}>
              <ServiceCardWrapper>
                <IconWrapper>{service.icon}</IconWrapper>
                <Title>{service.title}</Title>
                <Description>{service.description}</Description>
              </ServiceCardWrapper>
            </Col>
          ))}
        </ServiceCardRow>
      )}
    </>
  );
};

export default ServicesCard;
