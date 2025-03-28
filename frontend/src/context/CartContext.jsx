import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to cart
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

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // Update quantity (increment or decrement)
  const updateQuantity = (productId, action) => {
    setCart((prevCart) => {
      return prevCart.map(item => {
        if (item._id === productId) {
          let newQuantity;
          if (action === 'increment') {
            newQuantity = item.quantity + 1;
          } else if (action === 'decrement') {
            // Decrement quantity by 1
            newQuantity = item.quantity - 1;

            // If quantity becomes 0 or less, remove item from cart
            if (newQuantity <= 0) {
              removeFromCart(productId);
              return null;
            }
          }

          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item !== null); // Remove null (deleted item)
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};