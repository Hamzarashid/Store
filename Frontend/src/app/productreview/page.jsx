"use client";
import { Input, Modal, Rate, Typography } from "antd";
import { useState } from "react";
import { ProductContainer, ProductCard, ReviewButton } from "./pageStyled";

const { Title, Text } = Typography;

const page = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const products = [
    { id: 1, name: "Product 1", price: 4500, rating: 4 },
    { id: 2, name: "Product 2", price: 4500, rating: 5 },
    { id: 3, name: "Product 3", price: 4500, rating: 3 },
  ];

  const handleReviewButtonClick = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleSubmitReview = () => {
    console.log("Submitting review for product", selectedProduct);
    console.log("Rating:", rating);
    console.log("Review:", reviewText);
    setIsModalVisible(false);
  };
  return (
    <>
      <ProductContainer>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <Title level={5}>{product.name}</Title>
            <Text>{product.price}</Text>
            <ReviewButton onClick={() => handleReviewButtonClick(product)}>
              Write a Review
            </ReviewButton>
          </ProductCard>
        ))}
      </ProductContainer>

      <Modal
        title={`Write a Review for ${selectedProduct?.name}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmitReview}
        okText="Submit"
      >
        <div>
          <Rate value={rating} onChange={(value) => setRating(value)} />
          <Input.TextArea
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review"
          />
        </div>
      </Modal>
    </>
  );
};

export default page;
