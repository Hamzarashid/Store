"use client";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel, Rate } from "antd";
import { useRef } from "react";
import {
  Arrow,
  ArrowContainer,
  Card,
  CarouselWrap,
  Description,
  ParentContainer,
  ReviewsContainer,
  ReviewsTitle,
  ReviewsTitleContainer,
  Title,
} from "./ReviewStyled";
import {useState, useEffect} from "react"

const CustomArrow = ({ className, style, onClick, icon }) => (
  <Arrow className={className} style={{ ...style }} onClick={onClick}>
    {icon}
  </Arrow>
);

const Review = () => {
  const carouselRef = useRef(null);
  const [reviews, setReviews] = useState([])

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current?.prev();
    }
  };

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current?.next();
    }
  };

useEffect( () => {
const getReviews = async () => {
  const response = await fetch('/api/reviews')
  const data = await response.json();
  setReviews(data)
}
getReviews()
}, [])

  return (
    <ParentContainer>
      <ReviewsContainer>
        <ReviewsTitleContainer>
          <ReviewsTitle>Let customers speak for us</ReviewsTitle>
          <div>
            <Rate disabled defaultValue={5} style={{ color: "#d3d21e" }} />
            <span>from {reviews.length} reviews</span>
          </div>
        </ReviewsTitleContainer>
        <CarouselWrap>
          <Carousel
            autoplay
            ref={carouselRef}
            dots={false}
            slidesToShow={4}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  centerMode: true,
                  centerPadding: "40px",
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  centerMode: true,
                  centerPadding: "80px",
                },
              },
              {
                breakpoint: 320,
                settings: {
                  slidesToShow: 1,
                  centerMode: true,
                  centerPadding: "80px",
                },
              },
            ]}
          >
            {reviews.map((review) => (
              <Card key={review.id}>
                <Rate
                  disabled
                  defaultValue={review.rating}
                  style={{ color: "#d3d21e" }}
                />
                <Title>{review.customer_name}</Title>
                <Description>{review.message}</Description>
              </Card>
            ))}
          </Carousel>
          <ArrowContainer>
            <CustomArrow
              className="prev"
              icon={<LeftOutlined />}
              onClick={handlePrevClick}
            />
            <CustomArrow
              className="next"
              icon={<RightOutlined />}
              onClick={handleNextClick}
            />
          </ArrowContainer>
        </CarouselWrap>
      </ReviewsContainer>
    </ParentContainer>
  );
};

export default Review;
