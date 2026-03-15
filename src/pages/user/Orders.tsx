import { useState, useEffect } from "react";
import { ArrowLeftCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; 
import PlaySound from "@/utils/PlaySound";
import TrustIndicator from "@/components/shared/TrustIndicators";
import type { OrderInfo } from "@/types/user";
import { useModal } from "@/context/ModalContext";
import type { Notification } from "@/types/admin";
import EmptyOrders from "@/components/user/order/EmptyOrder";
import OrderList from "@/components/user/order/OrderList";

export default function OrdersPage() {
      /*
	localStorage.removeItem('users');
	localStorage.removeItem('profileImage');
	localStorage.removeItem('foodHubOrders');
	localStorage.removeItem('notifications');
      */
      const { setModalOpen } = useModal();
      const [orders, setOrders] = useState<OrderInfo[]>([]);
      const [ orderCount, setOrderCount ] = useState<number>(0);
      
      const navigate = useNavigate();

      useEffect(() => {
            const savedOrders = localStorage.getItem("foodHubOrders");
            
            if (savedOrders) {
                  const order: OrderInfo[] = savedOrders ? JSON.parse(savedOrders) : [];
                  const orderCount = order.filter(item => item.status !== 'Cancelled').length;

			// If it's an object, wrap it in an array
			setOrders(order);
                  setOrderCount(orderCount);
            }
            
      }, []);

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
                  message: `You cancelled order #ORDR-GWAPOKO${id}.`,
                  date: new Date().toLocaleDateString('en-Us', { month: 'long', day: '2-digit', year: 'numeric'}),
                  type: 'error'
            };
            
            notifications.push(newNotifications);
            console.log(notifications);
            // set notifications
            localStorage.setItem('notifications', JSON.stringify(notifications));
      };

      const handleConfirmCancelOrder = (id: number) => {
            setModalOpen({ 
                  modalToOpen: 'removeConfirmation',
                  message: 'Are you sure you want to cancel this order? It will be permanently cancelled after this.',
                  modalType: 'cancel order',
                  actionName: 'Cancel Order',
                  function: () => handleCancelOrder(id)
            });
      };

      if (orders.length === 0) return <EmptyOrders/>;

      return (
            <section className="bg-white w-full">
                  <div className="py-20 px-4  md:px-8 max-w-7xl mx-auto">
                        {/* Back Link */}
                        <div className="mb-6">
                              <button
                                    onClick={() => { navigate('/products') }}
                                    className="flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 hover:underline transition group cursor-pointer"
                              >
                                    <ArrowLeftCircle className="w-5 transition-transform group-hover:-translate-x-1" />
                                    Continue Shopping
                              </button>
                        </div>

                        {/* Page Title */}
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">My Orders</h1>
                        {orderCount !== 0 &&
                              <p className="text-gray-600 mb-8">{orderCount} order{orders.length !== 1 ? 's' : ''}</p>
                        }

                        {/* Orders List */}
                        <div className="space-y-6 mt-6">
                              {orders.map((order, index) => (
                                    <OrderList 
                                          order={order} 
                                          index={index}
                                          handleConfirmCancelOrder={handleConfirmCancelOrder}
                                    />
                              ))}
                        </div>

                        {/* Info / Trust Indicators */}
                        <TrustIndicator/>
                  </div>
            </section>  
      );
}