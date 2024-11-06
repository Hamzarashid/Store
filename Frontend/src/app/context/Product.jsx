import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [singleProduct, setSingleProduct] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: null,
    address: "",
    city: "",
    postalCode: null,
    country: "Pakistan",
  });

  const openCartDrawer = () => {
    setDrawerOpen(true);
  };
  const closeCartDrawer = () => {
    setDrawerOpen(false);
  };

  const updateCustomerInfo = (info) => {
    setCustomerInfo((prevInfo) => ({
      ...prevInfo,
      ...info,
    }));
  };

  useEffect(() => {
    // Fetch All Products
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    // Fetch All categories
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    // Fetch all data of AddToCart Data from local storage
    const loadCartItems = () => {
      try {
        const cart = localStorage.getItem("cart");
        setCartItems(cart ? JSON.parse(cart) : []);
      } catch (error) {
        console.error("Error loading cart items from localStorage:", error);
        setCartItems([]);
      }
    };
    // Fetch all data of WishList Data from local storage
    const loadWishlistItems = () => {
      try {
        const wishlist = localStorage.getItem("wishlist");
        setWishlistItems(wishlist ? JSON.parse(wishlist) : []);
      } catch (error) {
        console.error("Error loading wishlist items from localStorage:", error);
        setWishlistItems([]);
      }
    };

    fetchCategories();
    fetchProducts();
    loadCartItems();
    loadWishlistItems();
  }, []);

  // Fetch Single Product From id
  const fetchProductById = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/${id}`
      );
      const data = await response.json();
      setSingleProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // Update Cart items in Local Storage
  const updateCartItems = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Update Wishlist items in Local Storage
  const updateWishlistItems = (newWishlist) => {
    setWishlistItems(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  };

  // Checkout API
  const checkoutCart = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/csrf-token`, {
        credentials: "include",
      }).then(async (response) => {
        const data = await response.json();
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": data.csrf_token,
          },
          body: JSON.stringify({
            cart: cartItems,
            customer: customerInfo,
            total: calculateSubtotal(),
          }),
        });
      });
      updateCartItems([]);
    } catch (error) {
      console.error("Error completing checkout:", error);
    }
  };

  // AddToCart in LocalStorage
  const addToCart = (product, selectedSize, quantity) => {
    const cart = [...cartItems];
    const variant = product.variants.find((v) => v.size === selectedSize);
    const imageUrl = product.images.length > 0 ? product.images[0].url : "";

    if (!variant || variant.quantity < quantity) {
      console.error(
        `Size ${selectedSize} not available or insufficient stock.`
      );
      return;
    }

    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id && item.size === selectedSize
    );

    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        size: selectedSize,
        quantity,
        image: imageUrl,
        price: product.discount_price ?? product.actual_price,
      });
    }
    updateCartItems(cart);
    openCartDrawer();
  };

  // Calculate the subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  // AddToWishlist in LocalStorage
  const addToWishlist = (product) => {
    const wishlist = [...wishlistItems];

    if (!wishlist.find((item) => item.id === product.id)) {
      wishlist.push({
        id: product.id,
        name: product.name,
        image: product.images.length > 0 ? product.images[0].url : "",
        actual_price: product.actual_price,
        discount_price: product.discount_price,
      });

      updateWishlistItems(wishlist);
    }
  };

  // Remove From wishlist
  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(
      (item) => item.id !== productId
    );
    updateWishlistItems(updatedWishlist);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        singleProduct,
        fetchProductById,
        cartItems,
        addToCart,
        updateCartItems,
        drawerOpen,
        openCartDrawer,
        closeCartDrawer,
        checkoutCart,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        calculateSubtotal,
        customerInfo,
        updateCustomerInfo,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useStore = () => useContext(ProductContext);
