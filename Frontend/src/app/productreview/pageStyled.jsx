import styled from "styled-components";
import { Button } from "antd";

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: auto;
  width: 50%;
`;

export const ProductCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const ReviewButton = styled(Button)`
  background-color: #7b0323;
  border-color: #7b0323;
  color: white;
  &:hover {
    background-color: ${props => props.disabled ? '#ccc' : '#7b0323'};
    border-color: ${props => props.disabled ? '#ccc' : '#7b0323'} ;
  }
`;
