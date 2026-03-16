import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import PlaySound from "@/utils/PlaySound";
import type { CartItem, OrderFormData, OrderInfo } from "@/types/user";
import type { Notification } from "@/types/user";

interface UserContextType {
      cartItems: CartItem[];
      cartCount: number;
      profileImage: string;
      orderCount: number;
      notifCount: number;
      orders: OrderInfo[];
      pendingOrders: OrderInfo[];
      notifications: Notification[];
      addToCart: (product: CartItem, quantity: number, ) => void;
      removeFromCart: (id: number) => void;
      updateQuantity: (id: number, quantity: number) => void;
      clearCart: () => void;
      handleSetProfileImage: (profileImage: string) => void;
      handleCancelOrder:(id:number) => void;
      handlePlaceOrder: (
            data: OrderFormData,
            cartItems: CartItem[],
            setIsSubmitting: (b: boolean) => void,
            onClose: () => void,
            navigate: (path: string) => void
      ) => void;
      markRead: (id: number) => void;
      markAllRead: () => void;
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
      const [notifications, setNotifications] = useState<Notification[]>(() => {
            const saved = localStorage.getItem('notifications');
            return saved ? JSON.parse(saved) : [];
      });

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

      // Update localStorage whenever notification changes
      useEffect(() => {
            if (notifications.length > 0) {
                  localStorage.setItem("notifications", JSON.stringify(notifications));
            } else {
                  localStorage.removeItem("notifications");
            }
      }, [notifications]);
      
      const notifCount = notifications.filter(n => !n.read).length;

      // orders
      const cartCount = cartItems.length;
      const orderCount = orders.reduce((sum, order) => (order.status === 'Pending' ? sum + 1 : sum), 0);
      const pendingOrders = orders.filter(order => order.status !== "Cancelled");

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
            
            const orderCancelled = orders.find(order => order.id === id); // returns single object or undefined
            if (!orderCancelled) return; // safety check

            toast.success("Order cancelled!");
            PlaySound();

            localStorage.setItem(
                  "foodHubOrders",
                  JSON.stringify(orders.map(o => (o.id === id ? { ...o, status: "Cancelled" } : o)))
            );
            
            const newNotifications: Notification = {
                  id: id,
                  message: `You cancelled order #ORDR-GWAPOKO${id}.`,
                  type: 'error',
                  read: false,
                  orders: {...orderCancelled, status: 'Cancelled'}
            };

            setNotifications(prev => {
                  const updated = [...prev, newNotifications];
                  localStorage.setItem("notifications", JSON.stringify(updated));
                  return updated;
            });
      };

      const handlePlaceOrder = async (
            data: OrderFormData,
            cartItems: CartItem[],
            setIsSubmitting: (b: boolean) => void,
            onClose: () => void,
            navigate: (path: string) => void
      ) => {
            if (!cartItems.length) {
                  toast.error("Your cart is empty!");
                  return;
            }

            setIsSubmitting(true);

            // Simulate API delay
            await new Promise((r) => setTimeout(r, 1500));

            const savedOrders = localStorage.getItem("foodHubOrders");
            const orders: OrderInfo[] = savedOrders ? JSON.parse(savedOrders) : [];

            const idNo = orders.reduce((sum, o) => sum + o.id, 1);

            const newOrder: OrderInfo = {
                  id: idNo,
                  date: data.deliveryDate,
                  deliveryFee: 4.99,
                  status: "Pending",
                  total: cartItems.reduce((sum, i) => sum + i.price * i.quantity!, 0) + 4.99,
                  items: cartItems,
            };

            // Save order
            const updatedOrders = [...orders, newOrder];
            localStorage.setItem("foodHubOrders", JSON.stringify(updatedOrders));
            setOrders(updatedOrders);

            // Add notification
            const newNotification: Notification = {
                  id: idNo,
                  message: `You order #ORDR-GWAPOKO${idNo} has been successfully placed.`,
                  type: "success",
                  read: false,
                  orders: newOrder,
            };

            setNotifications(prev => {
                  const updated = [...prev, newNotification];
                  localStorage.setItem("notifications", JSON.stringify(updated));
                  return updated;
            });

            // Clear cart
            clearCart();
            PlaySound();
            setIsSubmitting(false);
            onClose();
            navigate("/order-success");
      };

      const markRead = (id: number) => {
            setNotifications(prev =>
                  prev.map(notif =>
                        notif.id === id ? { ...notif, read: true } : notif
                  )
            );
      };
      
      const markAllRead = () => {
            setNotifications(prev => 
                  prev.map(notif => ({ ...notif, read: true })
            ));
      };

      //const handleMarkAllRead = ()

      return (
            <UserContext.Provider 
                  value={{ 
                        profileImage,
                        notifications,
                        handleSetProfileImage,
                        cartItems, 
                        cartCount, 
                        orderCount,
                        notifCount,
                        orders,
                        pendingOrders,
                        handleCancelOrder,
                        addToCart, 
                        removeFromCart, 
                        updateQuantity, 
                        clearCart,
                        handlePlaceOrder,
                        markRead,
                        markAllRead
                  }}>
                  {children}
            </UserContext.Provider>
      );
};