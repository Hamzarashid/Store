"use client";
import {
  FacebookFilled,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  TikTokFilled,
} from "@ant-design/icons";
import { Col, Row, Collapse, Grid } from "antd";
import {
  ContactInfo,
  FooterContainer,
  FooterTitle,
  Icon,
  MenuList,
  SocialIcons,
  AccordionWrapper,
} from "./FooterStyled";

const { Panel } = Collapse;
const { useBreakpoint } = Grid;

const Footer = () => {
  const screens = useBreakpoint();

  return (
    <FooterContainer>
      <Row justify="center" align="middle">
        <Col xs={24} sm={24} md={6} lg={6}>
          {screens.md ? (
            <>
              <ContactInfo>
                <p>
                  <MailOutlined /> Demol@gmail.com
                </p>
                <p>
                  <PhoneOutlined /> +92 334 285956288
                </p>
              </ContactInfo>
              <SocialIcons>
                <Icon as={FacebookFilled} />
                <Icon as={InstagramOutlined} />
                <Icon as={TikTokFilled} />
              </SocialIcons>
            </>
          ) : (
            <AccordionWrapper>
              <Collapse accordion>
                <Panel header="Contact Information" key="1">
                  <ContactInfo>
                    <p>
                      <MailOutlined /> Demol@gmail.com
                    </p>
                    <p>
                      <PhoneOutlined /> +92 334 285956288
                    </p>
                  </ContactInfo>
                  <SocialIcons>
                    <Icon as={FacebookFilled} />
                    <Icon as={InstagramOutlined} />
                    <Icon as={TikTokFilled} />
                  </SocialIcons>
                </Panel>
              </Collapse>
            </AccordionWrapper>
          )}
        </Col>

        <Col xs={24} sm={24} md={6} lg={6}>
          {screens.md ? (
            <>
              <FooterTitle>Menu</FooterTitle>
              <MenuList>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Track Suits</a>
                </li>
                <li>
                  <a href="#">Polo Shirts</a>
                </li>
                <li>
                  <a href="#">Dri-fit Shirts</a>
                </li>
                <li>
                  <a href="#">Crew Neck Shirts</a>
                </li>
              </MenuList>
            </>
          ) : (
            <AccordionWrapper>
              <Collapse accordion>
                <Panel header="Menu" key="2">
                  <MenuList>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">Track Suits</a>
                    </li>
                    <li>
                      <a href="#">Polo Shirts</a>
                    </li>
                    <li>
                      <a href="#">Dri-fit Shirts</a>
                    </li>
                    <li>
                      <a href="#">Crew Neck Shirts</a>
                    </li>
                  </MenuList>
                </Panel>
              </Collapse>
            </AccordionWrapper>
          )}
        </Col>

        <Col xs={24} sm={24} md={6} lg={6}>
          {screens.md ? (
            <>
              <FooterTitle>Information</FooterTitle>
              <MenuList>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Return Policy</a>
                </li>
                <li>
                  <a href="#">Shipping Policy</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
              </MenuList>
            </>
          ) : (
            <AccordionWrapper>
              <Collapse accordion>
                <Panel header="Information" key="3">
                  <MenuList>
                    <li>
                      <a href="#">About Us</a>
                    </li>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#">Return Policy</a>
                    </li>
                    <li>
                      <a href="#">Shipping Policy</a>
                    </li>
                    <li>
                      <a href="#">Contact Us</a>
                    </li>
                  </MenuList>
                </Panel>
              </Collapse>
            </AccordionWrapper>
          )}
        </Col>
      </Row>
    </FooterContainer>
  );
};

export default Footer;
