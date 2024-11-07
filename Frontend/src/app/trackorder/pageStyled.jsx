import { Button, Card, Layout } from "antd";
import styled from "styled-components";

const { Header } = Layout;

// Styled Components
export const StyledHeader = styled(Header)`
  background: url("https://www.tcsexpress.com/image.jpg") no-repeat center
    center;
  background-size: cover;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 36px;
  font-weight: bold;
`;

export const TrackContainer = styled.div`
  text-align: center;
  margin-top: 10px;
`;

export const TrackButton = styled(Button)`
  background-color: red;
  color: white;
  &:hover {
    background-color: darkred;
  }
`;

export const StyledCard = styled(Card)`
  margin: 20px;
  text-align: left;
`;
