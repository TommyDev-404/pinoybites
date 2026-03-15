import { useUserContext } from "@/context/user/UserContext";

export default function OrdersTab() {
  const { orders } = useUserContext();

  const statusColors: Record<string, string> = {
    Delivered: "bg-emerald-100 text-emerald-800",
    "In Transit": "bg-amber-100 text-amber-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Order History</h2>
        <p className="text-sm text-gray-500 mt-1">Track your recent purchases.</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm transition-shadow"
          >
            {/* Header */}
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">Order #GWAPO-KO{order.id}</span>
              <span className="text-xs font-medium text-gray-500">{order.date}</span>
            </div>

            {/* Order Items */}
            <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} x ₱{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                <div className="text-right">
                  <p className="font-bold text-gray-900">₱{order.total.toFixed(2)}</p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    statusColors[order.status]
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}