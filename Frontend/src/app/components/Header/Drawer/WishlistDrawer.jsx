import { Drawer, Typography, Image, Button } from "antd";
import { useStore } from "../../../context/Product";
import { useState } from "react";

const { Text } = Typography;

const WishlistDrawer = () => {
  const { wishlistItems, removeFromWishlist } = useStore();
  const [loading, setLoading] = useState(false);

  const handleRemove = async (itemId) => {
    setLoading(true);
    try {
      await removeFromWishlist(itemId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {wishlistItems.length === 0 ? (
        <Text>No items in your wishlist.</Text>
      ) : (
        wishlistItems.map((item) => (
          <div
            key={item.id}
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              width={100}
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${item.image}`}
              alt={item.name}
            />
            <div style={{ marginLeft: "15px" }}>
              <Text strong>{item.name}</Text>
              <div>
                {item.discount_price ? (
                  <>
                    <Text delete>Rs.{item.actual_price}</Text>
                    <Text color="#7B0323">Rs.{item.discount_price}</Text>
                  </>
                ) : (
                  <Text>Rs.{item.actual_price}</Text>
                )}
              </div>
            </div>
            <Button
              type="text"
              danger
              onClick={() => handleRemove(item.id)}
              loading={loading}
              style={{ marginLeft: "auto" }}
            >
              Remove
            </Button>
          </div>
        ))
      )}
    </>
  );
};

export default WishlistDrawer;
