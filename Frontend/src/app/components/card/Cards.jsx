"use client";
import React from "react";
import {
  ArrowDownOutlined,
  EyeOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { Flex, Modal, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "../../context/Product";
import { Price } from "../../globalsStyled";
import HeaderText from "../HeaderText/HeaderText";
import ProductDetail from "../productdetail/ProductDetail";
import {
  AddToCart,
  Card,
  CardInner,
  CardsContainer,
  Discount,
  Heart,
  Image,
  InnerNested,
  LoadMore,
  Title,
} from "./CardsStyles";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function Cards({ filter }) {
  const router = useRouter();
  const {
    products,
    addToWishlist,
    wishlistItems,
    removeFromWishlist,
    singleProduct,
  } = useStore();
  const [loading, setLoading] = useState(true);
  const [hideTabs, setHideTabs] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [displayedRows, setDisplayedRows] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = filter
    ? products.filter((product) => product.category === filter)
    : products;

  const sameCaregoryProducts = filteredProducts.reduce((acc, prod) => {
    if (!acc[prod.category]) {
      acc[prod.category] = [];
    }
    acc[prod.category].push(prod);
    return acc;
  }, {});

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  const skeletonLoader = (
    <Flex vertical justify="center" align="center">
      <Skeleton.Input active />
      <CardsContainer>
        {[...Array(4).keys()].map((index) => (
          <Card key={index}>
            <Skeleton.Image active style={{ width: "300px", height: 200 }} />
            <Skeleton active />
          </Card>
        ))}
      </CardsContainer>
    </Flex>
  );

  const handleCardClick = (product) => {
    router.push(`/product/${product.id}`);
  };

  const showModal = (product) => {
    setHideTabs(true);
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setHideTabs(false);
    setIsModalVisible(false);
  };

  const isProductInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const handleWishlistClick = (e, product) => {
    e.stopPropagation();
    if (isProductInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const loadMoreRows = () => {
    setDisplayedRows((prevRows) => prevRows + 1);
  };

  const calculateDiscountPercentage = (actualPrice, discountPrice) => {
    return Math.round(((actualPrice - discountPrice) / actualPrice) * 100);
  };

  return (
    <>
      {Object.keys(sameCaregoryProducts).length === 0 && loading
        ? skeletonLoader
        : Object.keys(sameCaregoryProducts).map((category) => (
            <div key={category}>
              {!filter ? (
                <HeaderText
                  title={category}
                  subtitle={`Discover Our ${category} Collection!`}
                />
              ) : (
                ""
              )}

              <CardsContainer>
                {sameCaregoryProducts[category]
                  .slice(0, displayedRows * 5)
                  .map((prod) => (
                    <Card key={prod.id} onClick={() => handleCardClick(prod)}>
                      <InnerNested>
                        <Image
                          width={300}
                          height={400}
                          src={`${API_BASE_URL}/${prod.images[0].url}`}
                          alt={`Product image`}
                          priority
                        />
                        <Heart onClick={(e) => handleWishlistClick(e, prod)}>
                          {isProductInWishlist(prod.id) ? (
                            <HeartFilled />
                          ) : (
                            <HeartOutlined />
                          )}
                        </Heart>
                        {prod.discount_price && (
                          <Discount>
                            <p>
                              {calculateDiscountPercentage(
                                prod.actual_price,
                                prod.discount_price
                              )}
                              %
                            </p>
                          </Discount>
                        )}
                        <AddToCart
                          onClick={(e) => {
                            e.stopPropagation();
                            showModal(prod);
                          }}
                        >
                          <p>Add to Cart</p> <EyeOutlined />
                        </AddToCart>
                      </InnerNested>
                      <CardInner vertical justify={"center"} align={"center"}>
                        <Title>{prod.name}</Title>
                        <Price>
                          {prod.discount_price ? (
                            <>
                              <span>
                                <del>Rs.{prod.actual_price}</del>
                              </span>
                              Rs.{prod.discount_price}
                            </>
                          ) : (
                            <>Rs.{prod.actual_price}</>
                          )}
                        </Price>
                      </CardInner>
                    </Card>
                  ))}
              </CardsContainer>
              {displayedRows * 5 < sameCaregoryProducts[category].length && (
                <LoadMore
                  iconPosition="end"
                  icon={<ArrowDownOutlined />}
                  onClick={loadMoreRows}
                >
                  Load More
                </LoadMore>
              )}
            </div>
          ))}
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        {selectedProduct && (
          <ProductDetail
            hideTabs={hideTabs}
            id={selectedProduct.id}
            setIsModalVisible={setIsModalVisible}
          />
        )}
      </Modal>
    </>
  );
}

export default Cards;
