import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the CartContext
const CartContext = createContext(); // This is the context object

// Helper function to safely check localStorage availability
const isLocalStorageAvailable = () => {
  try {
    const testKey = '__test__';
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
      return false;
    }
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// CartProvider component
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [storageAvailable, setStorageAvailable] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false); // Track checkout completion
  const [cartComplete, setCartComplete] = useState(false); // Track cart completion

  // Initialize cart and check storage availability
  useEffect(() => {
    const available = isLocalStorageAvailable();
    setStorageAvailable(available);

    if (available) {
      try {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Persist cart to storage when it changes
  useEffect(() => {
    if (storageAvailable) {
      try {
        localStorage.setItem('cartItems', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart, storageAvailable]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, action) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity: action === 'increment' ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: Math.max(newQuantity, 1) } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCheckoutComplete(false); // Reset checkout completion when cart is cleared
    setCartComplete(false); // Reset cart completion when cart is cleared
    if (storageAvailable) {
      try {
        localStorage.removeItem('cartItems');
      } catch (error) {
        console.error('Error clearing cart from localStorage:', error);
      }
    }
  };

  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateCartItemQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        storageAvailable, // Optional: expose storage availability to consumers
        checkoutComplete, // Expose checkout completion state
        setCheckoutComplete, // Expose setter for checkout completion
        cartComplete, // Expose cart completion state
        setCartComplete, // Expose setter for cart completion
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Named exports for CartContext, CartProvider, and useCart
export { CartContext, CartProvider, useCart };