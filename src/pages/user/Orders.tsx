import { ArrowLeftCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TrustIndicator from "@/components/shared/TrustIndicators";
import { useModal } from "@/context/user/ModalContext";
import EmptyOrders from "@/components/user/order/EmptyOrder";
import OrderList from "@/components/user/order/OrderList";
import { useUserContext } from "@/context/user/UserContext";

export default function Orders() {
      /*
	localStorage.removeItem('users');
	localStorage.removeItem('profileImage');
	localStorage.removeItem('foodHubOrders');
	localStorage.removeItem('notifications');
      */
      const { orders, orderCount, handleCancelOrder } = useUserContext();
      const { setModalOpen } = useModal();
      
      // filter order to show the pending only
      const pendingOrders = orders.filter(order => order.status !== 'Cancelled'); 

      const navigate = useNavigate();

      const handleConfirmCancelOrder = (id: number) => {
            setModalOpen({ 
                  modalToOpen: 'removeConfirmation',
                  message: 'Are you sure you want to cancel this order? It will be permanently cancelled after this.',
                  modalType: 'cancel order',
                  actionName: 'Cancel Order',
                  function: () => handleCancelOrder(id)
            });
      };
      
      if (orderCount === 0) return <EmptyOrders/>;

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
                              {pendingOrders.map((order, index) => (
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