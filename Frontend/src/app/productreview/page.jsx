"use client";
import { Input, Modal, Rate, Typography, Row, message } from "antd";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; 
import { ProductContainer, ProductCard, ReviewButton } from "./pageStyled";

const { Text } = Typography;

const page = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [hasOrders, setHasOrders] = useState(false);
  const [review, setReview] = useState({
    product_id:0,
    customer_name:"",
    rating:0,
    message:"",
    order_id:0
  });

  const router = useRouter(); 
  const params = useSearchParams(); 

  const orderId = params.get("orderId");

  useEffect(() => {
    if (!orderId || hasOrders) {
      router.push("/"); 
    }
  }, [orderId, hasOrders]);

  async function getOrderList() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orderList/${orderId}`
      );
  
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      if(data.length === 0) {
        setHasOrders(true);
      } else {
        setHasOrders(false)
      }
      setOrders(data); 
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  useEffect(() => {
    if(orderId){
      getOrderList()
    }
  }, [orderId, isModalVisible])
  

  const handleReviewButtonClick = (product) => {
    console.log(product)
    setSelectedProduct(product);
    setReview({...review, product_id: product.product_id, customer_name:product.customer_name, order_id:product.id})
    setIsModalVisible(true);
  };

  const handleSubmitReview = async() => {
    let result;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/csrf-token`, {
        credentials: "include",
      }).then(async (response) => {
        const data = await response.json();
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/review`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": data.csrf_token,
          },
          body: JSON.stringify(review),
        });
      });
      setIsModalVisible(false);
      return (result = true);
    } catch (error) {
      console.error("Error completing checkout:", error);
      return (result = false);
    }
  };

  return (
    <div style={{margin:"70px 0px"}}>
      <ProductContainer>
        {orders.map((product) => (
          <ProductCard key={product.id}>
            <Text level={5}>{product.product_name}</Text>
            <Text>{product.price}</Text>
            <Text>{product.size}</Text>
            <ReviewButton disabled={product.review_completed} onClick={() => handleReviewButtonClick(product)}>
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
          <Rate value={review.rating} onChange={(value) => setReview({...review, rating: value})} />
          <Input.TextArea
            rows={4}
            value={review.message}
            onChange={(e) => setReview({...review, message: e.target.value})}
            placeholder="Write your review"
          />
        </div>
      </Modal>
    </div>
  );
};

export default page;
