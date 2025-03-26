import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Get the cart from localStorage or default to an empty array if not found
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Update localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
  }, [cart]);

  // Add product to cart (increment quantity if it already exists)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(item => item._id === product._id);
      if (existingProductIndex > -1) {
        // Product already exists, so increment its quantity
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        // Product doesn't exist, add it with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove or decrement product quantity in cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map(product => {
          if (product._id === productId) {
            // Decrement quantity
            const updatedProduct = { ...product, quantity: product.quantity - 1 };
            return updatedProduct.quantity > 0 ? updatedProduct : null; // Remove if quantity reaches 0
          }
          return product;
        })
        .filter(Boolean); // Remove null values (products with quantity 0)
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
