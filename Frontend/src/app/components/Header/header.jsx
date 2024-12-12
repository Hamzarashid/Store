import {
  DownOutlined,
  HeartOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Badge, Drawer, Dropdown, Flex, Space, theme } from "antd";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useStore } from "../../context/Product";
import useIsCheckoutPage from "../../utils/useIsCheckoutPage";
import CartDrawer from "./Drawer/CartDrawer";
import SearchDrawer from "./Drawer/SearchDrawer";
import WishlistDrawer from "./Drawer/WishlistDrawer";
import {
  BottomContainer,
  CategoriesWrapper,
  DropDownRender,
  FooterButton,
  HeaderBottom,
  HeaderIcon,
  NavBottom,
  NavCenter,
  Section,
  Subtotal,
} from "./headerStyled";
import Link from "antd/es/typography/Link";

const { useToken } = theme;
const Header = () => {
  const navCenterRef = useRef(null);
  const router = useRouter();
  const [drawerContent, setDrawerContent] = useState("cart");
  const isCheckoutPage = useIsCheckoutPage();
  const { token } = useToken();
  const {
    categories,
    cartItems,
    wishlistItems,
    openCartDrawer,
    closeCartDrawer,
    drawerOpen,
    calculateSubtotal,
  } = useStore();

  const toggleDrawer = (content) => {
    setDrawerContent(content);
    openCartDrawer();
  };

  const getDrawerTitle = () => {
    switch (drawerContent) {
      case "cart":
        return "SHOPPING CART";
      case "wishlist":
        return "WISHLIST";
      case "search":
        return "SEARCH PRODUCTS";
      default:
        return "";
    }
  };

  const DrawerContent = ({ drawerContent }) => {
    switch (drawerContent) {
      case "search":
        return <SearchDrawer />;
      case "cart":
        return <CartDrawer />;
      case "wishlist":
        return <WishlistDrawer />;
      default:
        return null;
    }
  };

  const handleCheckout = async () => {
    closeCartDrawer();
    router.push(`/checkout`);
  };

  const handleCategories = async (categoryname) => {
    router.push(`/collections/${categoryname}`);
  };

  return (
    <>
      <HeaderBottom ref={navCenterRef}>
        <NavCenter align="center" justify="space-between"></NavCenter>
        <BottomContainer>
          <NavBottom justify="space-between" align="center">
            <Section align="center">
              <Dropdown
                dropdownRender={() => (
                  <DropDownRender boxshadow={token.boxShadowSecondary}>
                    {categories.map((category, index) => (
                      <p
                        key={index}
                        onClick={() => handleCategories(category.name)}
                      >
                        {category.name}
                      </p>
                    ))}
                  </DropDownRender>
                )}
              >
                <CategoriesWrapper
                  type="text"
                  onClick={(e) => e.preventDefault()}
                >
                  <Space>
                    Categories
                    <DownOutlined rotate={360} />
                  </Space>
                </CategoriesWrapper>
              </Dropdown>
            </Section>
            <Link href="/">
              <UserAddOutlined />
            </Link>
            <HeaderIcon gap="15px">
              {!isCheckoutPage && (
                <>
                  <SearchOutlined onClick={() => toggleDrawer("search")} />
                  <Badge
                    count={wishlistItems.length}
                    size="small"
                    color="#7B0323"
                  >
                    <HeartOutlined onClick={() => toggleDrawer("wishlist")} />
                  </Badge>
                </>
              )}
              <Badge count={cartItems.length} size="small" color="#7B0323">
                <ShoppingCartOutlined onClick={() => toggleDrawer("cart")} />
              </Badge>

              <Drawer
                title={getDrawerTitle()}
                placement="right"
                onClose={closeCartDrawer}
                open={drawerOpen}
                footer={
                  drawerContent === "cart" &&
                  cartItems.length > 0 && (
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Flex justify="space-between" align="center">
                        <Subtotal level={5} strong>
                          SUBTOTAL:
                        </Subtotal>{" "}
                        <Subtotal level={5} strong>
                          Rs.{calculateSubtotal()}PKR
                        </Subtotal>
                      </Flex>
                      <FooterButton onClick={handleCheckout}>
                        Checkout
                      </FooterButton>
                    </Space>
                  )
                }
              >
                <DrawerContent drawerContent={drawerContent} />
              </Drawer>
            </HeaderIcon>
          </NavBottom>
        </BottomContainer>
      </HeaderBottom>
    </>
  );
};

export default Header;
