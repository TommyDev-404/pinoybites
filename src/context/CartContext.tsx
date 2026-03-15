import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import PlaySound from "@/utils/PlaySound";
import type { CartItem } from "@/types/user";

interface CartContextType {
      cartItems: CartItem[];
      cartCount: number;
      addToCart: (product: CartItem, quantity: number, ) => void;
      removeFromCart: (id: number) => void;
      updateQuantity: (id: number, quantity: number) => void;
      clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
      const context = useContext(CartContext);
      if (!context) throw new Error("useCart must be used within a CartProvider");
      return context;
};

export const CartProvider = ({ children } : { children : React.ReactNode } ) => {
      const [cartItems, setCartItems] = useState<CartItem[]>(() => {
            const stored = localStorage.getItem('foodHubCart');
            return stored ? JSON.parse(stored) : [];
      });
      
      // Update localStorage whenever cart changes
      useEffect(() => {
            if (cartItems.length > 0) {
                  localStorage.setItem("foodHubCart", JSON.stringify(cartItems));
            } else {
                  localStorage.removeItem("foodHubCart");
            }
      }, [cartItems]);

      const cartCount = cartItems.length;

      const addToCart = (product: CartItem, quantity: number) => {
            const index = cartItems.findIndex(item => item.id === product.id);
            let updatedCart;
      
            if (index !== -1) {
                  updatedCart = [...cartItems];
                  updatedCart[index].quantity! += quantity;
            } else {
                  updatedCart = [...cartItems, { ...product, quantity }];
            }

            setCartItems(updatedCart);
            
            toast.success(`Successfully added to your cart!`);
            PlaySound();
      };

      const removeFromCart = (id: number) => {
            setCartItems(prev => {
                  const updated = prev.filter(item => item.id !== id); // get the rest of the item that is not removed
                  return updated;
            });

            cartItems.map(item => { 
                  if (item.id === id) {
                        toast.success(`${item.name} (${item.quantity}) remove to cart!`);
                        PlaySound();
                  } 
            });
      };

      const updateQuantity = (id: number, quantity: number) => {
            // get the data of the prev item and update the quantity if there is matching id
            setCartItems(prev =>
                  prev.map(item => (item.id === id ? { ...item, quantity } : item))
            );
      };

      const clearCart = () => setCartItems([]);

      return (
            <CartContext.Provider value={{ cartItems, cartCount, addToCart, removeFromCart, updateQuantity, clearCart }}>
                  {children}
            </CartContext.Provider>
      );
};