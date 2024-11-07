import { Button as AntButton, Flex, Progress, Tabs } from "antd";
import styled from "styled-components";
const { TabPane } = Tabs;

export const DescriptionContainer = styled.div`
  margin: 20px 0;
`;

export const DescriptionText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin: 10px 0;
  color: #333;
`;

export const ReviewContainer = styled(Flex)`
  margin-bottom: 20px;
`;

export const ReviewStats = styled(Flex)`
  & div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

export const ReviewSummary = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ReviewListContainer = styled(Flex)`
  padding: 10px;
`;

export const CustomProgress = styled(Progress)`
  .ant-progress-bg {
    background-color: #7b0323 !important;
  }

  .ant-progress-success-bg {
    background-color: #4caf50 !important;
  }

  width: 150px;
  margin: 0 10px;
`;

export const CustomButton = styled(AntButton)`
  background: #7b0323;
  border-color: #7b0323;
  color: white;
  padding: 10px 20px;
  font-weight: 700;
  line-height: 16px;
  &:hover {
    background: #7b0323 !important;
    border-color: #7b0323 !important;
    color: white !important;
  }
`;

export const CustomTabs = styled(Tabs)`
  .ant-tabs-tab {
    color: #7b0323 !important;
  }

  .ant-tabs-tab:hover {
    color: #7b0323;
  }
  .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #7b0323 !important;
  }

  .ant-tabs-ink-bar {
    background-color: #7b0323;
  }
`;

export const CustomTabPane = styled(TabPane)`
  background-color: #ffffff;
  color: #7b0323;
  padding: 16px;

  &:hover {
    color: #7b0323;
  }
`;
