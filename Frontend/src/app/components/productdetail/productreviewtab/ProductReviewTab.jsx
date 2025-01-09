"use client";
import {
  Flex,
  List,
  Rate,
  Typography,
} from "antd";
import {
  CustomProgress,
  ReviewContainer,
  ReviewListContainer,
  ReviewStats,
  ReviewSummary,
} from "./ProductReviewTabStyled";

const { Text, Title } = Typography;

const ProductReviewTab = ({reviews}) => {

  const getTotalReviews =(val) => {
    let counter = 0
    reviews.forEach(item => {
      if(item.rating === val){
        counter++
      }
    });
    return counter;
  }

  return (
    <>
      <ReviewContainer justify="space-between" align="baseline">
        <ReviewListContainer vertical>
          <List
            itemLayout="vertical"
            dataSource={reviews}
            renderItem={(review) => (
                <List.Item>
                  <Flex justify="space-between">
                  <Rate disabled defaultValue={review.rating} count={5} />
                  <Text type="secondary" color="#7b0323">
                    {review.updated_at}
                  </Text>
                </Flex>
                  <List.Item.Meta
                    title={<Text strong>{review.message}</Text>}
                    description={
                        <Text type="secondary">{review.customer_name}</Text>
                    }
                  />
                </List.Item>
            )}
          />
        </ReviewListContainer>
        <ReviewStats vertical align="start">
          <Title level={2}>Customer Reviews</Title>
          {[5, 4, 3, 2, 1].map((rating) => (
            <ReviewSummary key={rating}>
              <Rate disabled defaultValue={rating} count={5} />
              <CustomProgress
                percent={getTotalReviews(rating)}
                size="small"
                status="active"
                showInfo={false}
              />
              <Text>{getTotalReviews(rating)}</Text>
            </ReviewSummary>
          ))}
        </ReviewStats>
      </ReviewContainer>
    </>
  );
};

export default ProductReviewTab;
