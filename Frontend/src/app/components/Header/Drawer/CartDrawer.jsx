import { Image, List, Space, Typography } from "antd";
import { useStore } from "../../../context/Product";
import { CustomButton, CustomInput } from "../headerStyled";

const { Text } = Typography;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const CartDrawer = () => {
  const { cartItems, updateCartItems } = useStore();

  const handleIncrease = (id, size) => {
    const newCart = cartItems.map((item) => {
      if (item.id === id && item.size === size) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    updateCartItems(newCart);
  };

  const handleDecrease = (id, size) => {
    const newCart = cartItems
      .map((item) => {
        if (item.id === id && item.size === size) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return null;
        }
        return item;
      })
      .filter((item) => item !== null);
    updateCartItems(newCart);
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Image
                  src={`${API_BASE_URL}/${item.image}`}
                  alt={item.name}
                  width={100}
                  height={150}
                />
              }
              title={
                <>
                  <Text strong>{item.name}</Text>
                  <br />
                  <Text type="secondary">Size: {item.size}</Text>
                </>
              }
              description={
                <>
                  <Text strong> {`Rs:${item.price}`}</Text>
                  <br />
                  <Space.Compact block>
                    <CustomButton
                      type="primary"
                      onClick={() => handleDecrease(item.id, item.size)}
                    >
                      -
                    </CustomButton>
                    <CustomInput min={1} value={item.quantity} readOnly />
                    <CustomButton
                      type="primary"
                      onClick={() => handleIncrease(item.id, item.size)}
                    >
                      +
                    </CustomButton>
                  </Space.Compact>
                </>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default CartDrawer;
