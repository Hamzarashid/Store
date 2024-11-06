import { Button, Card, Form, Radio, Row } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

export const FormWrapper = styled.div`
  width: 50%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const SummaryWrapper = styled(Card)`
  width: 100%;
  height: 100vh;
  padding: 10px;
  background-color: #f7f7f7;
`;

export const ShippingMethod = styled.div`
  padding: 10px;
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
`;

export const InnerNested = styled.div`
  position: relative;
  display: inline-block;
`;

export const Quantity = styled.div`
  position: absolute;
  top: 0;
  left: -10px;
  transform: translate(50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    background-color: #7b0323;
    padding: 2px 4px;
    border-radius: 50%;
    color: #fff;
    font-size: 10px;
    line-height: 1;
  }
`;

export const InnerContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
`;

export const CustomRadioGroup = styled(Radio.Group)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
export const CustomRow = styled(Row)`
  margin-bottom: 20px;
`;
export const CustomButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
  padding: 25px;
  background-color: #7b0323;
  color: #fff;
  font-size: 18px;
  font-weight: 600;

  &&.ant-btn-default:hover {
    background-color: #7b0323;
    color: #fff;
    border-color: #7b0323;
  }
`;
