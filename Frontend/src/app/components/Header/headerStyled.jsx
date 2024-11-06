import {
  Button,
  Dropdown as dd,
  Flex,
  Input,
  Button as AntButton,
  Typography,
} from "antd";
import styled from "styled-components";

const { Title } = Typography;

export const HeaderBottom = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #fff;
`;

export const BottomContainer = styled.div`
  background-color: #fff;
`;

export const NavTop = styled(Flex)`
  padding: "5px 70px";
`;

export const NavCenter = styled(Flex)`
  padding: "20px 70px";
`;

export const Section = styled(Flex)`
  height: 100%;
  button {
    border-radius: 2px;
    min-height: 50px;
  }
`;

export const Dropdown = styled(dd)`
  cursor: pointer;
  font-size: 0.8rem;
  color: white;
  width: 150px;
`;

export const DropDownRender = styled.div`
  background-color: #fff;
  padding: 4px 0;
  box-shadow: ${(props) => `${props.boxshadow}`};
  border-radius: 8px;
  text-align: center;

  & p:hover {
    border-radius: 2px;
    cursor: pointer;
    background-color: #7b0323db;
    color: white;
  }
`;

export const CategoriesWrapper = styled(Button)`
  background-color: #7b0323;
  display: inline;
  font-weight: 500;
  color: white;
`;

export const NavBottom = styled(Flex)`
  min-height: 50px;
`;
export const PopoverContent = styled(Flex)`
  font-weight: 700;
  font-size: 1.8rem;
`;
export const HeaderIcon = styled(Flex)`
  padding: 14px;
  align-items: center;
`;

export const CustomButton = styled(AntButton)`
  background: #7b0323;
  border-color: #7b0323;
  color: white;

  &:hover {
    background: #7b0323 !important;
    border-color: #7b0323 !important;
    color: white !important;
  }
`;
export const CustomInput = styled(Input)`
  width: 60px;
  text-align: center;
`;

export const Subtotal = styled(Title)`
  color: #7b0323;
  font-size: 18px !important;
`;

export const FooterButton = styled(Button)`
  background-color: #7b0323;
  border-color: #7b0323;
  color: white;
  width: 100%;

  &:hover {
    background-color: #000;
    border-color: #000;
    color: white;
  }
`;
export const Filter = styled.div`
  cursor: pointer;
`;
