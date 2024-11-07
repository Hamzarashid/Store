"use client";
import {
  Divider,
  Flex,
  InputNumber,
  List,
  Modal,
  Rate,
  Space,
  Tabs,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { tabreviews } from "../../../constants";
import {
  CustomButton,
  CustomProgress,
  CustomTabs,
  DescriptionContainer,
  DescriptionText,
  InnerContainer,
  ReviewContainer,
  ReviewListContainer,
  ReviewStats,
  ReviewSummary,
  SubmitButton,
} from "./ProductReviewTabStyled";

const { Text, Title } = Typography;

const ProductReviewTab = ({ description }) => {
  return (
    <>
      <ReviewContainer justify="space-between" align="baseline">
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
        <ReviewStats vertical align="start">
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
        </ReviewStats>
      </ReviewContainer>
    </>
  );
};

export default ProductReviewTab;
