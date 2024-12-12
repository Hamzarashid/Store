"use client";
import { Input, Modal, Rate, Typography, Row } from "antd";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; 
import { ProductContainer, ProductCard, ReviewButton } from "./pageStyled";

const { Title, Text } = Typography;

const page = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const router = useRouter(); 
  const params = useSearchParams(); 

  const orderId = params.get("orderId");

  useEffect(() => {
    if (!orderId) {
      router.push("/"); 
    }
  }, [orderId]);

  async function getOrderList() {
    try {
      const response = await fetch(`/api/orders/${orderId}`); 
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      setOrders(data); 
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  useEffect(() => {
    if(orderId){
      getOrderList()
    }
  }, [orderId])
  

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
    <div style={{margin:"70px 0px"}}>
      <ProductContainer>
        {orders.map((product) => (
          <ProductCard key={product.id}>
            <Text level={5}>{product.product_name}</Text>
            <Text>{product.price}</Text>
            <Text>{product.size}</Text>
            <ReviewButton onClick={() => handleReviewButtonClick(product)}>
              Write a Review
            </ReviewButton>
          </ProductCard>
        ))}
      </ProductContainer>

      <Modal
        title={`Write a Review for ${selectedProduct?.product_name}`}
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
    </div>
  );
};

export default page;
