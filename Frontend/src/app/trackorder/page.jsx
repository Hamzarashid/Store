"use client";
import { Col, Input, Layout, Row } from "antd";
import {
  StyledCard,
  StyledHeader,
  TrackButton,
  TrackContainer,
} from "./pageStyled";
const { Content } = Layout;

const page = () => {
  return (
    <Layout>
      <StyledHeader>TRACK & TRACE WITH EASE!</StyledHeader>
      <Content>
        <TrackContainer>
          <h2>Track Your Shipment</h2>
          <p>Enter any combination of TCS tracking reference number.</p>
          <Input.Group compact>
            <Input style={{ width: "300px" }} placeholder="Tracking Number" />
            <TrackButton>Track Shipment</TrackButton>
          </Input.Group>
        </TrackContainer>

        <Row gutter={16} style={{ marginTop: "50px" }}>
          <Col span={12}>
            <StyledCard title="Shipment Booking Details">
              <p>
                <b>Tracking Number:</b> XYZ123456789
              </p>
              <p>
                <b>Agent Reference Number:</b> AGT456789
              </p>
              <p>
                <b>Origin:</b> City A
              </p>
              <p>
                <b>Destination:</b> City B
              </p>
            </StyledCard>
          </Col>
          <Col span={12}>
            <StyledCard title="Shipment Track Summary">
              <p>
                <b>Current Status:</b> In Transit
              </p>
              <p>
                <b>Last Updated:</b> 2 hours ago
              </p>
            </StyledCard>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default page;
