import { Button } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  display: flex;
  justify-content: center;
`;
export const InnerContainer = styled.div`
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    transition: transform 1s ease;
    border-radius: 5px;
    object-fit: fit;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;
export const OverlayButton = styled(Button)`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 40px;
  border-radius: 20px;
  border: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7b0323 !important;
    color: white !important;
  }
`;
