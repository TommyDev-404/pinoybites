import { Bell, Inbox } from "lucide-react";
import { useUserContext } from "@/context/user/UserContext";
import { useModal } from "@/context/user/ModalContext";
import type { OrderInfo } from "@/types/user";

export default function NotificationsPage() {
      //localStorage.removeItem('notifications');
      //localStorage.removeItem('foodHubOrders');
      const { setModalOpen } = useModal();
      const { notifications, markAllRead, markRead } = useUserContext();

      
      const unreadCount = notifications.filter((n) => !n.read).length;

      const handleViewOrder = (order: OrderInfo) => {
            markRead(order.id);
            setModalOpen({
                  modalToOpen: 'notifInfo',
                  orderInfo: order
            });
      };

      return (
            <section className="max-w-[80%] mx-auto py-20 px-4">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-2">
                        <div>
                        <div className="flex items-center gap-2 text-2xl font-bold">
                              <Bell size={28} /> Notifications
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                              Here you can view all your recent notifications and check the status of your orders.
                        </p>
                        </div>

                        <div className="flex items-center gap-4 mt-3 md:mt-0">
                        {notifications.length > 0 && (
                              <button
                              onClick={markAllRead}
                              className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600 transition"
                              >
                              Mark All as Read
                              </button>
                        )}

                        {unreadCount > 0 && (
                              <span className="px-2 py-1 bg-red-500 text-white rounded-full text-sm font-semibold">
                              {unreadCount} Unread
                              </span>
                        )}
                        </div>
                  </div>

                  {/* Notifications List */}
                  <div className="space-y-4 max-h-[70vh] overflow-y-auto p-4">
                        {notifications.length === 0 ? (
                              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center flex-col">
                                    <Inbox size={80} className="opacity-20" />
                                    <span className="text-md mt-2">No notifications yet.</span>
                              </div>
                        ) : (
                              notifications.map((n, index) => (
                                    <div
                                    key={index}
                                    className={`flex flex-col md:flex-row items-start md:items-center justify-between p-5 border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer relative ${
                                    !n.read ? "bg-amber-50" : "bg-white"
                                    }`}
                                    >
                                    {/* Unread Indicator */}
                                    {!n.read && (
                                    <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                                    )}

                                    <div className="flex items-start gap-3 md:gap-4 flex-1">
                                    <div
                                          className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                          n.type === "success" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                                          }`}
                                    >
                                          <Bell size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                          <p className="font-medium text-gray-800">{n.message}</p>
                                          <p className="text-xs text-gray-500">{new Date(n.orders.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric'})}</p>
                                          
                                    </div>
                                    </div>

                                    <button
                                    onClick={() => handleViewOrder(n.orders)}
                                    className="mt-3 md:mt-0 px-4 py-2 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600 transition"
                                    >
                                    View Order Info
                                    </button>
                                    </div>
                              ))
                        )}
                  </div>

            </section>
      );
}