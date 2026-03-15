import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import PlaySound from "@/utils/PlaySound";
import type { CartItem, OrderInfo } from "@/types/user";
import type { Notification } from "@/types/user";

interface UserContextType {
      cartItems: CartItem[];
      cartCount: number;
      profileImage: string;
      orderCount: number;
      orders: OrderInfo[];
      notifications: Notification[];
      addToCart: (product: CartItem, quantity: number, ) => void;
      removeFromCart: (id: number) => void;
      updateQuantity: (id: number, quantity: number) => void;
      clearCart: () => void;
      handleSetProfileImage: (profileImage: string) => void;
      handleCancelOrder:(id:number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
      const context = useContext(UserContext);
      if (!context) throw new Error("useCart must be used within a GlobalContext Provider");
      return context;
};

export const UserContextProvider = ({ children } : { children : React.ReactNode } ) => {
      const [ profileImage, setProfileImage ] = useState<string>('');
      const [cartItems, setCartItems] = useState<CartItem[]>(() => {
            const stored = localStorage.getItem('foodHubCart');
            return stored ? JSON.parse(stored) : [];
      });
      const [orders, setOrders] = useState<OrderInfo[]>(() => {
            const stored = localStorage.getItem('foodHubOrders');
            return stored ? JSON.parse(stored) : [];
      });
      
      // notifications
      const savedNotification = localStorage.getItem('notifications');
      const notifications: Notification[] = savedNotification ? JSON.parse(savedNotification) : [];

      // Load profile image from localStorage on mount
      useEffect(() => {
            const storedProfileImage = localStorage.getItem("profileImage");
            if (storedProfileImage) setProfileImage(storedProfileImage);
      }, []);

      // Update localStorage whenever cart changes
      useEffect(() => {
            if (cartItems.length > 0) {
                  localStorage.setItem("foodHubCart", JSON.stringify(cartItems));
            } else {
                  localStorage.removeItem("foodHubCart");
            }
      }, [cartItems]);

      // Update localStorage whenever orders changes
      useEffect(() => {
            if (orders.length > 0) {
                  localStorage.setItem("foodHubOrders", JSON.stringify(orders));
            } else {
                  localStorage.removeItem("foodHubOrders");
            }
      }, [orders]);

      const cartCount = cartItems.length;
      const orderCount = orders.reduce((sum, order) => (order.status === 'Pending' ? sum + 1 : sum), 0);

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

      const handleSetProfileImage = (image: string) => {
            localStorage.setItem('profileImage', image);
            setProfileImage(image);
      };

      const handleCancelOrder = (id: number) => {
            setOrders(prev =>
                  prev.map(order =>
                  order.id === id ? { ...order, status: "Cancelled" } : order
                  )
            );

            toast.success("Order cancelled!");
            PlaySound();

            localStorage.setItem(
                  "foodHubOrders",
                  JSON.stringify(orders.map(o => (o.id === id ? { ...o, status: "Cancelled" } : o)))
            );
            
            const stored = localStorage.getItem('notifications');
            const notifications = stored ? JSON.parse(stored) as Notification[] : [];
      
            const newNotifications: Notification = {
                  id: id,
                  message: `You cancelled order #ORDR-GWAPOKO${id}.`,
                  date: new Date().toLocaleDateString('en-Us', { month: 'long', day: '2-digit', year: 'numeric'}),
                  type: 'error'
            };
            
            notifications.push(newNotifications);
            console.log(notifications);
            // set notifications
            localStorage.setItem('notifications', JSON.stringify(notifications));
      };


      return (
            <UserContext.Provider 
                  value={{ 
                        profileImage,
                        notifications,
                        handleSetProfileImage,
                        cartItems, 
                        cartCount, 
                        orderCount,
                        orders,
                        handleCancelOrder,
                        addToCart, 
                        removeFromCart, 
                        updateQuantity, 
                        clearCart 
                  }}>
                  {children}
            </UserContext.Provider>
      );
};