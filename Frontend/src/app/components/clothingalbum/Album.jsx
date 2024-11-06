"use client";
import { Col, Row } from "antd";
import { items } from "../../constants";
import { Container, InnerContainer, OverlayButton } from "./AlbumStyled";

const Album = () => {
  const column1 = items.slice(0, 1);
  const column2 = items.slice(1, 3);
  const column3 = items.slice(3, 4);

  return (
    <Container>
      <Row gutter={20} justify="center">
        <Col xs={24} sm={24} lg={9}>
          {column1.map((item, index) => (
            <InnerContainer key={index}>
              <img
                alt={item.title}
                src={item.image}
                style={{ width: "100%", height: "100%" }}
              />
              <OverlayButton>Button</OverlayButton>
            </InnerContainer>
          ))}
        </Col>

        <Col xs={7} sm={7} lg={4}>
          {column2.map((item, index) => (
            <InnerContainer key={index}>
              <img alt={item.title} src={item.image} />
              <OverlayButton>Button</OverlayButton>
            </InnerContainer>
          ))}
        </Col>

        <Col xs={16} sm={16} lg={9}>
          {column3.map((item, index) => (
            <InnerContainer key={index}>
              <img
                alt={item.title}
                src={item.image}
                style={{ width: "100%", height: "100%" }}
              />
              <OverlayButton>Button</OverlayButton>
            </InnerContainer>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Album;
