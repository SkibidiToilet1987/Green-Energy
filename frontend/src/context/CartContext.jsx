import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

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

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [storageAvailable, setStorageAvailable] = useState(false);

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
    // Note: We don't need to handle the in-memory case here
    // as React state will keep it in memory automatically
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};