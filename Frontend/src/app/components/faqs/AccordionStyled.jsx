import styled from 'styled-components';

export const MainContainer = styled.div`
  padding: 30px;
  .ant-collapse {
    background: ${({ theme }) => theme.colorBgContainer};
  }

  .ant-collapse-item {
    border: none;
    background: #7b0323;

        &:first-child {
      border-radius: 8px 8px 0 0;
    }

    &:last-child {
      border-radius: 0 0 8px 8px
  }

  .ant-collapse-header {
    font-size: 16px;
    font-weight: 500;
    color:#fff
  }

  .ant-collapse-content-box {
    p {
      margin: 0;
       color:#fff
    }
  }

  .ant-collapse-expand-icon {
    font-size: 16px;
  }
`;

export const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
