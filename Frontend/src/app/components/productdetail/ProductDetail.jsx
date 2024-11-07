"use client";
import { Flex, Rate, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useStore } from "../../context/Product";
import { Price } from "../../globalsStyled";
import SkeletonLoader from "./Loader/Skeleton";
import {
  ButtonWrapper,
  Card,
  CarouselImage,
  CustomButton,
  CustomInput,
  CustomRadioGroup,
  DetailContainer,
  ImageContainer,
  InfoContainer,
  ParentContainer,
  SizeGuideLink,
  StockBar,
  StockIndicator,
  StrikeThroughRadioButton,
  StyledCarousel,
  TextWrapper,
  Title,
} from "./ProductDetailStyled";
import ProductDetailTab from "./producttab/ProductDetailTab";

const { Text } = Typography;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProductDetail = ({ id, hideTabs, setIsModalVisible }) => {
  const { fetchProductById, singleProduct, addToCart } = useStore();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id]);

  useEffect(() => {
    if (
      singleProduct &&
      singleProduct.variants &&
      singleProduct.variants.length > 0
    ) {
      const firstAvailableVariant = singleProduct.variants.find(
        (variant) => variant.quantity > 0
      );

      if (firstAvailableVariant) {
        setSelectedSize(firstAvailableVariant.size);
      }
    }
  }, [singleProduct]);

  const handleAddToCart = () => {
    addToCart(singleProduct, selectedSize, quantity);
    if (typeof setIsModalVisible === "function") {
      setIsModalVisible(false);
    }
  };

  if (!singleProduct) {
    return (
      <ParentContainer vertical>
        <SkeletonLoader />
      </ParentContainer>
    );
  }

  const {
    name,
    actual_price,
    discount_price,
    description,
    variants,
    images,
    total_quantity,
  } = singleProduct;

  return (
    <ParentContainer vertical justify="space-around">
      <DetailContainer>
        <ImageContainer>
          <StyledCarousel autoplay arrows dots={false}>
            {images.map((src, index) => (
              <div key={index}>
                <CarouselImage
                  src={`${API_BASE_URL}/${src.url}`}
                  alt={`carousel-${index}`}
                />
              </div>
            ))}
          </StyledCarousel>
        </ImageContainer>
        <InfoContainer>
          <Card>
            {total_quantity === 0 ? (
              <Text strong style={{ color: "#ff4d4f" }}>
                Sorry, this item is out of stock.
              </Text>
            ) : (
              <>
                <Text strong style={{ color: "#7b0323" }}>
                  HURRY! ONLY {total_quantity} LEFT IN STOCK.
                </Text>
                <StockBar>
                  <StockIndicator
                    stockPercentage={(total_quantity / 100) * 100}
                  />
                </StockBar>
              </>
            )}
            <Title level={4}>{name}</Title>
            <Flex align="center" justify="space-between">
              <Flex align="center" justify="center">
                {discount_price ? (
                  <Price>
                    <span>
                      <del>Rs.{actual_price}</del>
                    </span>
                    <>Rs.{discount_price}</>
                  </Price>
                ) : (
                  <>Rs.{actual_price}</>
                )}
              </Flex>

              <Flex align="center" justify="center" gap={10}>
                <Rate disabled defaultValue={5} count={5} />
                <Text> 4 reviews</Text>
              </Flex>
            </Flex>
            <Text>{description}</Text>
            <TextWrapper>
              <Text strong>SIZE:</Text>
              <SizeGuideLink>Size Guide</SizeGuideLink>
            </TextWrapper>
            <CustomRadioGroup
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              buttonStyle="solid"
            >
              {variants.map((item) => (
                <StrikeThroughRadioButton
                  key={item.size}
                  value={item.size}
                  disabled={item.quantity === 0}
                >
                  {item.size}
                </StrikeThroughRadioButton>
              ))}
            </CustomRadioGroup>

            <ButtonWrapper>
              {total_quantity === 0 ? (
                <CustomButton disabled block type="primary">
                  Out of Stock
                </CustomButton>
              ) : (
                <>
                  <Space.Compact block>
                    <CustomButton
                      type="primary"
                      onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                    >
                      -
                    </CustomButton>
                    <CustomInput
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(parseInt(e.target.value) || 1)
                      }
                    />
                    <CustomButton
                      type="primary"
                      onClick={() => setQuantity((q) => q + 1)}
                    >
                      +
                    </CustomButton>
                  </Space.Compact>
                  <CustomButton onClick={handleAddToCart}>
                    ADD TO CART
                  </CustomButton>
                </>
              )}
            </ButtonWrapper>
          </Card>
        </InfoContainer>
      </DetailContainer>
      {!hideTabs && <ProductDetailTab description={description} />}
    </ParentContainer>
  );
};

export default ProductDetail;
