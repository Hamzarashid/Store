"use client";
import { Divider, Flex, List, Rate, Table, Tabs, Typography } from "antd";
import { tabreviews } from "../../../constants";
import {
  CustomButton,
  CustomProgress,
  CustomTabs,
  DescriptionContainer,
  DescriptionText,
  HighlightText,
  ReviewContainer,
  ReviewListContainer,
  ReviewStats,
  ReviewSummary,
} from "./ProductDetailTabStyled";

const { Text, Title } = Typography;
const { TabPane } = Tabs;

const ProductDetailTab = ({ description }) => {
  return (
    <CustomTabs defaultActiveKey="1">
      <TabPane tab="Description" key="1" className="custom-tab-pane">
        <DescriptionContainer>
          <DescriptionText>{description}</DescriptionText>
        </DescriptionContainer>
      </TabPane>
      <TabPane tab="Additional Information" key="2">
        <Flex justify="space-around">
          <Text>Size</Text>
        </Flex>
      </TabPane>
      <TabPane tab="Reviews" key="3">
        <ReviewContainer justify="space-around" align="center">
          <ReviewStats vertical align="start">
            <div>
              <Rate disabled defaultValue={5} />
              <Text>5.00 out of 5</Text>
            </div>
            <Text>Based on 4 reviews</Text>
          </ReviewStats>
          <Flex vertical align="center">
            <Title level={2}>Customer Reviews</Title>
            {[5, 4, 3, 2, 1].map((rating) => (
              <ReviewSummary key={rating}>
                <Rate disabled defaultValue={rating} count={5} />
                <CustomProgress
                  percent={rating === 5 ? 100 : 0}
                  size="small"
                  status="active"
                  showInfo={false}
                />
                <Text>{rating === 5 ? 4 : 0}</Text>
              </ReviewSummary>
            ))}
          </Flex>
          <CustomButton type="primary">Write a review</CustomButton>
        </ReviewContainer>
        <Divider />
        <ReviewListContainer vertical>
          <List
            itemLayout="vertical"
            dataSource={tabreviews}
            renderItem={(review) => (
              <>
                <Flex justify="space-between">
                  <Rate disabled defaultValue={review.rating} />
                  <Text type="secondary" color="#7b0323">
                    {review.date}
                  </Text>
                </Flex>
                <List.Item>
                  <List.Item.Meta
                    title={<Text strong>{review.title}</Text>}
                    description={
                      <>
                        <Text type="secondary">{review.author}</Text>
                        <br />
                        <Text>{review.content}</Text>
                      </>
                    }
                  />
                </List.Item>
              </>
            )}
          />
        </ReviewListContainer>
      </TabPane>
    </CustomTabs>
  );
};

export default ProductDetailTab;
