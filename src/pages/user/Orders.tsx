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
      const { pendingOrders, orderCount, handleCancelOrder } = useUserContext();
      const { setModalOpen } = useModal();
      
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
            <section className="w-full pt-20 pb-80">
      <div className="h-screen px-4 md:px-8 max-w-[80%] mx-auto">
            
            {/* Page Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Orders History</h1>

            {/* Description */}
            <p className="text-gray-600 mb-6">
                  View and track all your snack orders. Monitor deliveries, check pending purchases,
                  or review cancelled orders anytime.
            </p>

            {/* Count + Filter Row */}
            <div className="flex items-center justify-between mb-6">
                  
                  {/* Order Count */}
                  {orderCount !== 0 ? (
                        <p className="text-gray-500">
                              {orderCount} order{pendingOrders.length !== 1 ? "s" : ""}
                        </p>
                  ) : <div />}

                  {/* Filter */}
                  <select
                        defaultValue="Pending"
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Cancelled">Cancelled</option>
                  </select>

            </div>

            {/* Orders List */}
            <div className="space-y-6 mt-6">
                  {pendingOrders.map((order, index) => (
                        <OrderList
                              key={index}
                              order={order}
                              index={index}
                              handleConfirmCancelOrder={handleConfirmCancelOrder}
                        />
                  ))}
            </div>

            {/* Info / Trust Indicators */}
            <TrustIndicator />

      </div>
</section>
      );
}